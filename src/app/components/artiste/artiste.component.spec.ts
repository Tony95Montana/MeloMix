import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisteComponent } from './artiste.component';

describe('ArtisteComponent', () => {
  let component: ArtisteComponent;
  let fixture: ComponentFixture<ArtisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
