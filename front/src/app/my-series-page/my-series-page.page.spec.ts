import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MySeriesPagePage } from './my-series-page.page';

describe('MySeriesPagePage', () => {
  let component: MySeriesPagePage;
  let fixture: ComponentFixture<MySeriesPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySeriesPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MySeriesPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
