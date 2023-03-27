import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {InternalDocumentService} from "../../shared/services/internal-document.service";
import {InternalDocument} from "../../shared/models/internal-document.model";
import {MatDialog} from "@angular/material/dialog";
import {AddDocumentComponent} from "./add-document/add-document.component";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  public internalDocuments: InternalDocument[] = [];

  constructor(private router: Router,
              private dialog: MatDialog,
              public authService: AuthService,
              public internalDocumentService: InternalDocumentService) {
  }

  ngOnInit(): void {
    if (this.authService.currentUser == null) {
      this.router.navigate(['']);
    } else {
      this.internalDocumentService.getAllInternalDocuments().subscribe(documents => {
        this.internalDocuments = documents.map(internalDocument => {
          internalDocument.fileLink$ = this.internalDocumentService.getInternalDocumentFile(internalDocument.fileName);
          return internalDocument;
        });
      })
    }
  }

  addDocument() {
    this.dialog.open(AddDocumentComponent).afterClosed().subscribe(() => {
      // RELOAD DOCUMENTS
    })
  }
}
