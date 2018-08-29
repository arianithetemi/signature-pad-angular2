import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sigPad') canvasEl: ElementRef;
  isDrawing: Boolean = false;
  canvasNativeEl;

  context: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.canvasNativeEl = this.canvasEl.nativeElement as HTMLCanvasElement;
    this.context = this.canvasNativeEl.getContext('2d');
  }

  onCanvasClear() {
    this.context.save();
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvasNativeEl.width, this.canvasNativeEl.height);
  }

  onSave() {
    console.log(this.context.canvas.toDataURL());
    const image = this.canvasNativeEl.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    window.location.href = image;
  }

  onMouseDown(e) {
    const mouseX = e.pageX - this.canvasNativeEl.offsetLeft;
    const mouseY = e.pageY - this.canvasNativeEl.offsetTop;

    this.isDrawing = true;
    this.context.moveTo(mouseX, mouseY);
  }

  onTouchStart(e) {
    const mouseX = e.pageX - this.canvasNativeEl.offsetLeft;
    const mouseY = e.pageY - this.canvasNativeEl.offsetTop;

    this.isDrawing = true;
    this.context.moveTo(mouseX, mouseY);
  }

  onMouseMove(e) {
    const mouseX = e.pageX - this.canvasNativeEl.offsetLeft;
    const mouseY = e.pageY - this.canvasNativeEl.offsetTop;

    if (this.isDrawing) {
      this.context.lineTo(mouseX, mouseY);
      this.context.stroke();
    }
  }

  onTouchMove(e) {
    e.preventDefault();
    const mouseX = e.pageX - this.canvasNativeEl.offsetLeft;
    const mouseY = e.pageY - this.canvasNativeEl.offsetTop;

    if (this.isDrawing) {
      this.context.lineTo(mouseX, mouseY);
      this.context.stroke();
    }
  }

  onMouseLeave() {
    this.isDrawing = false;
  }

  onMouseUp() {
    this.isDrawing = false;
  }
}
