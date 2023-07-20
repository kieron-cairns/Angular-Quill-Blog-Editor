import { Component, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(QuillEditorComponent, { static: true })
  editor!: QuillEditorComponent;

  content: string = ''

  // Inject HttpClient in the constructor
  constructor(private http: HttpClient) {}


  editorCreated($event: any) {
    const toolbar = $event.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
  }

  exportContentToHTML() {
    const editorContentAsHTML = this.editor.quillEditor.root.innerHTML;
    console.log(editorContentAsHTML);

    const postApiEndpointUrl = '';

    const payload = {
      content: editorContentAsHTML
    };

    this.http.post(postApiEndpointUrl, payload)
    .subscribe(res => {
      console.log(res);//
    });
  }


  imageHandler() {
    const URL = prompt('Enter the image URL');
    const range = this.editor.quillEditor.getSelection(true);
    if (range) {
      this.editor.quillEditor.insertEmbed(range.index, 'image', URL);
    }
  }
}
