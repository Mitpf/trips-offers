import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.scss']
})
export class Page404Component implements OnInit {

  constructor(private elementRef:ElementRef, private renderer: Renderer2){}

  ngOnInit(): void {
    // js script
    let lFollowX = 0,
          lFollowY = 0,
          friction = 1 / 30;

    let x = 0, y = 0, lMouseX = 0, lMouseY = 0;
    const animate = () => {
      x += (lFollowX - x) * friction;
      y += (lFollowY - y) * friction;

      const translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

      // Use Renderer2 to manipulate DOM elements
      this.renderer.setStyle(this.elementRef.nativeElement.querySelector('img'), 'transform', translate);

      window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
      lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
      lFollowX = (20 * lMouseX) / 100;
      lFollowY = (10 * lMouseY) / 100;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);

    animate(); // Start animation
  }


 

}
