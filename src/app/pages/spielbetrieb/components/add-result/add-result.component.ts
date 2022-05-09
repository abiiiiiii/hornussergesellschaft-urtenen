import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Team} from "../../../../shared/models/team.model";
import {GameMode} from "../../../../shared/enums/game-mode.enum";
import {Game} from "../../../../shared/models/game.model";
import {GameService} from "../../../../shared/services/game.service";
import {TeamService} from "../../../../shared/services/team.service";
import {FileUploadService} from "../../../../shared/services/file-upload.service";
import {combineLatest, EMPTY, of} from "rxjs";

class SpielModus {
  mode: GameMode = GameMode.CHAMPIONSHIP;
  displayName: string = "";
}

class DialogData {
  teams: Team[] = [];
  game: Game;
}

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {

  modes: SpielModus[] = [
    {
      mode: GameMode.CHAMPIONSHIP,
      displayName: "Meisterschaft"
    },
    {
      mode: GameMode.TEST_GAME,
      displayName: "Wettspiel"
    },
    {
      mode: GameMode.FESTIVAL,
      displayName: "Fest"
    },
    {
      mode: GameMode.SMALL_EVENT,
      displayName: "Kleinanlass"
    },
    {
      mode: GameMode.GROUP_CHAMPIONSHIP,
      displayName: "Gruppenmeisterschaft"
    },
  ]

  homeList: File;
  awayList?: File;
  reportFile?: File;
  homeResult: FormGroup;
  awayResult: FormGroup;
  resultForm: FormGroup
  isCreating = false;
  showValidationErrorMessage = false;
  showCreationErrorMessage = false;

  constructor(public dialogRef: MatDialogRef<AddResultComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private formBuilder: FormBuilder,
              private gameService: GameService,
              private teamService: TeamService,
              private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.homeResult = this.formBuilder.group({
      name: ['', Validators.required],
      points: ['', Validators.required],
      numbers: ['', Validators.required]
    })

    this.awayResult = this.formBuilder.group({
      name: ['', Validators.required],
      points: ['', Validators.required],
      numbers: ['', Validators.required]
    })

    this.resultForm = this.formBuilder.group({
      homeList: ['', Validators.required],
      awayList: [''],
      report: [''],
      reportFile: [''],
      mode: [GameMode.CHAMPIONSHIP, Validators.required],
      date: [new Date(), Validators.required],
      team: [this.data.teams[0], Validators.required],
      festivalName: [''],
      rank: [''],
      homeResult: [this.homeResult, Validators.required],
      awayResult: this.awayResult
    });

    this.resultForm.valueChanges.subscribe(() => {
      this.showCreationErrorMessage = false;
      this.showValidationErrorMessage = false;
    })
  }

  add() {
    if (this.resultForm && this.validateResult()) {
      this.isCreating = true;
      let result = this.resultForm.value;
      let game: Game = {
        createdAt: result.date,
        awayResult: this.awayResult?.value,
        homeResult: this.homeResult?.value,
        homeList: result.homeList,
        awayList: result.awayList,
        mode: result.mode,
        rank: result.rank,
        festivalName: result.festivalName,
        report: result.report,
        reportFile: result.reportFile,
      }

      this.gameService.createGame(game).subscribe(ref => {
        this.updateTeam(ref.id)
        let homeList$ = this.fileUploadService.uploadFile('lists/', this.homeList);
        let awayList$ = of(null);
        let reportFile$ = of(null);
        if (this.awayList) {
          awayList$ = this.fileUploadService.uploadFile('lists/', this.awayList);
        }
        if (this.reportFile) {
          reportFile$ = this.fileUploadService.uploadFile('pdf/report/', this.reportFile);
        }
        combineLatest([homeList$, awayList$, reportFile$]).subscribe(() => {
          this.dialogRef.close();
          this.isCreating = false;
        }, error => {
          this.gameService.deleteGame(ref.id).subscribe();
          console.log(error);
          this.showCreationErrorMessage = true;
        })
      }, error => {
        console.log(error)
        this.showCreationErrorMessage = true;
        this.isCreating = false
      })
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
      this.resultForm?.get('reportFile')?.setValue(this.reportFile?.name);
    } else {
      this.reportFile = undefined;
      this.resultForm?.get('reportFile')?.setValue('');
    }
  }

  needAwayResult(): boolean {
    let mode: GameMode = this.resultForm?.get('mode')?.value;
    if (mode == GameMode.CHAMPIONSHIP || mode == GameMode.TEST_GAME || mode == GameMode.GROUP_CHAMPIONSHIP) {
      return true;
    } else {
      this.awayResult = this.formBuilder.group({
        name: ['', Validators.required],
        points: ['', Validators.required],
        numbers: ['', Validators.required]
      });
      return false;
    }
  }

  isFestival(): boolean {
    let mode: GameMode = this.resultForm?.get('mode')?.value;
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

    return this.resultForm?.get('homeList')?.value != '';
  }

  private updateTeam(id: string) {
    let team: Team = this.resultForm?.get('team')?.value;
    team.games.push(id);
    this.teamService.updateTeam(team).subscribe(() => {
      console.log("Updated team")
    })
  }
}
