import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Team} from "../../../../shared/models/team.model";
import {GameMode} from "../../../../shared/enums/game-mode.enum";
import {Game} from "../../../../shared/models/game.model";
import {GameService} from "../../../../shared/services/game.service";
import {TeamService} from "../../../../shared/services/team.service";
import {FileUploadService} from "../../../../shared/services/file-upload.service";
import {combineLatest, of} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.scss']
})
export class EditResultComponent implements OnInit {
  homeList: File;
  awayList?: File;
  reportFile?: File;
  homeResult: UntypedFormGroup;
  awayResult: UntypedFormGroup;
  resultForm: UntypedFormGroup
  isUpdating = false;
  showValidationErrorMessage = false;
  showUpdateErrorMessage = false;

  constructor(public dialogRef: MatDialogRef<EditResultComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Game,
              private formBuilder: UntypedFormBuilder,
              private gameService: GameService,
              private teamService: TeamService,
              private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.homeResult = this.formBuilder.group({
      name: [this.data.homeResult.name, Validators.required],
      points: [this.data.homeResult.points, Validators.required],
      numbers: [this.data.homeResult.numbers, Validators.required]
    })

    if (this.data.awayResult.name != '') {
      this.awayResult = this.formBuilder.group({
        name: [this.data.awayResult.name, Validators.required],
        points: [this.data.awayResult.points, Validators.required],
        numbers: [this.data.awayResult.numbers, Validators.required]
      })
    }

    this.resultForm = this.formBuilder.group({
      homeList: [''],
      awayList: [''],
      report: [this.data.report],
      reportFile: [''],
      date: [new Date(this.data.createdAt.seconds * 1000), Validators.required],
      festivalName: [this.data.festivalName],
      rank: [this.data.rank],
      homeResult: [this.homeResult, Validators.required],
      awayResult: this.awayResult
    });

    this.resultForm.valueChanges.subscribe(() => {
      this.showValidationErrorMessage = false;
      this.showUpdateErrorMessage = false;
    })
  }

  edit() {
    if (this.resultForm && this.validateResult()) {
      this.isUpdating = true;
      let homeList$ = of(null);
      let awayList$ = of(null);
      let reportFile$ = of(null);
      let result = this.resultForm.value;
      this.data.report = result.report;
      this.data.createdAt = result.date;
      this.data.festivalName = result.festivalName;
      this.data.rank = result.rank;
      this.data.homeResult = this.homeResult.value;
      if (this.needAwayResult()) {
        this.data.awayResult = result.awayResult
      } else {
        this.data.awayResult = {id: '', name: '', numbers: null, points: null}
      }
      if (this.homeList) {
        this.data.homeList = result.homeList;
        homeList$ = this.fileUploadService.uploadFile('lists/', this.homeList);
      }
      if (this.awayList) {
        this.data.awayList = result.awayList;
        awayList$ = this.fileUploadService.uploadFile('lists/', this.awayList);
      }
      if (this.reportFile) {
        this.data.reportFile = result.reportFile;
        reportFile$ = this.fileUploadService.uploadFile('pdf/report/', this.reportFile);
      }
      let update$ = this.gameService.updateGame(this.data);
      combineLatest([homeList$, awayList$, reportFile$, update$]).subscribe(() => {
        this.isUpdating = false;
        this.teamService.load$.next(undefined);
        this.dialogRef.close();
      }, error => {
        console.log(error);
        this.showUpdateErrorMessage = true;
        this.isUpdating = false;
      })
    } else {
      this.showValidationErrorMessage = true;
    }
  }

  handleHomeListInput(event: any) {
    if (event.target.files.length > 0) {
      this.homeList = event.target.files[0];
      this.resultForm?.get('homeList')?.setValue(this.homeList?.name);
    } else {
      this.homeList = undefined;
      this.resultForm?.get('homeList')?.setValue('');
    }
  }

  handleAwayListInput(event: any) {
    if (event.target.files.length > 0) {
      this.awayList = event.target.files[0];
      this.resultForm?.get('awayList')?.setValue(this.awayList?.name);
    } else {
      this.awayList = undefined;
      this.resultForm?.get('awayList')?.setValue('');
    }
  }

  handleReportInput(event: any) {
    if (event.target.files.length > 0) {
      this.reportFile = event.target.files[0];
      this.resultForm?.get('reportFile')?.setValue(this.awayList?.name);
    } else {
      this.reportFile = undefined;
      this.resultForm?.get('reportFile')?.setValue('');
    }
  }

  needAwayResult(): boolean {
    let mode: GameMode = this.data.mode;
    if (mode == GameMode.CHAMPIONSHIP || mode == GameMode.TEST_GAME || mode == GameMode.GROUP_CHAMPIONSHIP) {
      return true;
    } else {
      return false;
    }
  }

  isFestival(): boolean {
    let mode: GameMode = this.data.mode;
    return mode == GameMode.FESTIVAL || mode == GameMode.SMALL_EVENT;
  }

  private validateResult(): boolean {
    if (this.homeResult?.invalid || (this.needAwayResult() && this.awayResult?.invalid)) {
      return false;
    }

    if (this.isFestival()) {
      if (this.resultForm?.get('festivalName')?.value == '' || this.resultForm?.get('rank')?.value == '') {
        return false;
      }
    }
    return true;
  }

  private updateTeam(id: string) {
    let team: Team = this.resultForm?.get('team')?.value;
    team.games.push(id);
    this.teamService.updateTeam(team).subscribe(() => {
      console.log("Updated team")
    })
  }
}
