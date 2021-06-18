import { Component, ComponentFactoryResolver, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { JsonDataService } from './jsondataservice';
import {SelectItem} from 'primeng/api';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  jobs: any[];
  title = 'ecosystm-task-by-gaurav';
  items: MenuItem[];
  sortField: string;
  sortOptions: SelectItem[];
  sortOrder: number;
  readFullContentFlag = {};
  isAdvanceFilterMode: boolean = false;
  cities: any[] = []
  @ViewChild("dv")dataView: DataView;
  filterColumns: string;
  @ViewChild('advanceFiltersContainer',{read:ViewContainerRef})
  advFiltComp:ViewContainerRef;


  constructor(private vcr: ViewContainerRef,private cfr: ComponentFactoryResolver, private injector: Injector, private jsonDataService: JsonDataService) { }

  ngAfterViewInit(){
    this.dataView.filterBy = this.filterColumns;
    console.log(this.dataView)
  }

  ngOnInit() {
    this.filterColumns = "title,tagsAndSkills";
    this.cities = [{
      'name':'Mumbai'
    },{
      'name':'Bengaluru'
    },{
      'name':'Hyderabad'
    },{
      'name':'Delhi'
    },{
      'name':'Pune'
    },{
      'name':'Chennai'
    },{
      'name':'Kolkata'
    },{
      'name':'Ahmedabad'
    },]
    this.sortField = 'createdDate'
    this.jsonDataService.getJobsData().then(j => {
      this.jobs = j
      this.jobs = this.jobs.sort((a,b)=>
      b.createdDate - a.createdDate
    )
    this.jobs.forEach(ele=>{
      ele['location'] = ele['placeholders'][2]['label'];
      let yearRange:string = ele['placeholders'][0]['label'].split(' ')[0];
      let yearArr = yearRange.split('-');
      ele['expStartYr'] = yearArr[0];
    })
    });
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
  ];
    this.items = [
      {
        label: 'For Employees',
        icon: 'pi pi-users',
      },
      {
        label: 'For Applicants',
        icon: 'pi pi-id-card',
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
      },
    ];
  }

  getKnobValue(str){
    let yearRange:string = str.split(' ')[0];
    let avgYearArr = yearRange.split('-');
    let avgYearExp: number = (parseInt(avgYearArr[0]) + parseInt(avgYearArr[1]))/2;
    if (avgYearExp <= 3){
      return 20;
    }else if (avgYearExp <= 6){
      return 50;
    }else if (avgYearExp <= 8){
      return 70;
    }else{
      return 100;
    }
  }
  scrollToTop(){
    window.scrollTo(0,0)
  }
  getProcessedString(str: string){
    return  str.replace(/,/g,', ');
  }
  getStyleObject(color:string){
    return {'color':color}
  }
  activatedFullContent(jobId, event){
    
  }
  getShortContent(jobDesc){
    var str = jobDesc.replace( /(<([^>]+)>)/ig, '');
    return str.slice(0,100) + '...';
  }
  getFilterString(str){
    console.log(str)
    return ""
  }
  myFilter(str){
    this.dataView.filter(str.target.value,'contains')
  }
  applyFilter(obj:any){
    console.log(obj)
    if(obj.type === 'location'){
      this.dataView.filterBy = "location";
      this.dataView.filter(obj.data,'contains')
    }else if (obj.type === 'experience'){
      this.dataView.filterBy = "expStartYr";
      this.dataView.filter(obj.data,'gte')
    }
    console.log(this.dataView)
  }
  removeFilter(str:string){
    this.dataView.filterBy = this.filterColumns;
    this.dataView.filter('','contains')
    console.log(this.dataView)
  }
  async loadFiltersComponent(){
    this.advFiltComp.clear();
    const {AdvanceFilterComponent} = await import('./advance-filter/advance-filter.component');
    let compAdvFilt = this.advFiltComp.createComponent(this.cfr.resolveComponentFactory(AdvanceFilterComponent));
    compAdvFilt.instance.cities = this.cities;
    compAdvFilt.instance.isAdvanceFilterMode = this.isAdvanceFilterMode;
    compAdvFilt.instance.filterAddHandler.subscribe(data=>{
      this.applyFilter(data)
    });
    compAdvFilt.instance.filterRemoveHandler.subscribe(data=>{
      this.removeFilter(data)
    });
  }
}
