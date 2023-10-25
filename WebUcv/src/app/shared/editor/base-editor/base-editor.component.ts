import { Component, ElementRef, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;

import ImageResize from 'quill-image-resize'
Quill.register('modules/imageResize', ImageResize)

@Component({
  selector: 'base-editor',
  templateUrl: './base-editor.component.html',
  styleUrls: ['./base-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseEditorComponent),
      multi: true
    }
  ]
})
export class BaseEditorComponent implements ControlValueAccessor {
  content: string = '';

  modules = {
    imageResize: {},
    syntax: true,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['image'],
      ['link']
    ]
  }

  onChange: any = () => { }
  onTouch: any = () => { }

  onNgModelChange(event: any) {
    this.writeValue(event);
  }

  writeValue(obj: any): void {
    this.content = obj;
    
    this.onChange(obj);
    this.onTouch(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }
}
