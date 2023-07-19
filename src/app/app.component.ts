import { Component, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(QuillEditorComponent, { static: true })
  editor!: QuillEditorComponent;

  content: string = ''

  // ...

  editorCreated($event: any) {
    const toolbar = $event.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
  }

  imageHandler() {
    const URL = prompt('Enter the image URL');
    const range = this.editor.quillEditor.getSelection(true);
    if (range) {
      this.editor.quillEditor.insertEmbed(range.index, 'image', URL);
    }
  }
}
