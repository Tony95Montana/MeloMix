import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMusiqueComponent } from './item-musique.component';

describe('ItemMusiqueComponent', () => {
  let component: ItemMusiqueComponent;
  let fixture: ComponentFixture<ItemMusiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMusiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemMusiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
