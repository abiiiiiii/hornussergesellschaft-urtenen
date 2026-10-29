import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {InternalDocumentService} from "../../shared/services/internal-document.service";
import {InternalDocument} from "../../shared/models/internal-document.model";
import {MatDialog} from "@angular/material/dialog";
import {AddDocumentComponent} from "./add-document/add-document.component";
import {EditDocumentComponent} from "./edit-document/edit-document.component";
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon, AsyncPipe]
})
export class MemberComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  public readonly authService = inject(AuthService);
  public readonly internalDocumentService = inject(InternalDocumentService);

  public internalDocuments: InternalDocument[] = [];

  ngOnInit(): void {
    if (this.authService.currentUser() == null) {
      this.router.navigate(['']);
    } else {
      this.loadDocuments();
    }
  }

  private loadDocuments() {
    this.internalDocumentService.getAllInternalDocuments().subscribe(documents => {
      console.log(documents);
      this.internalDocuments = documents.map(internalDocument => {
        internalDocument.fileLink$ = this.internalDocumentService.getInternalDocumentFile(internalDocument.fileName);
        return internalDocument;
      }).sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true, sensitivity: 'base'}));
    });
  }

  addDocument() {
    this.dialog.open(AddDocumentComponent).afterClosed().subscribe(() => {
      this.loadDocuments();
    });
  }

  editDocument(document: InternalDocument) {
    this.dialog.open(EditDocumentComponent, {data: document}).afterClosed().subscribe(() => {
      this.loadDocuments();
    });
  }

  deleteDocument(id: string) {
    this.internalDocumentService.deleteInternalDocument(id).subscribe(() => {
      this.loadDocuments();
    });
  }
}
