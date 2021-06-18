import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
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
  selectedLocation: any;
  @ViewChild("dv")dataView: DataView;
  filterColumns: string;

  constructor(private jsonDataService: JsonDataService) { }

  ngAfterViewInit(){
    this.dataView.filterBy = this.filterColumns;
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
  applyFilter(str:string){
    if(str === 'loc'){
      this.dataView.filterBy = "location"
      this.dataView.filter(this.selectedLocation.name,'contains')
    }
    console.log(this.dataView)
  }
  removeFilter(str:string){
    if(str === 'loc'){
      this.dataView.filterBy = this.filterColumns;
      this.dataView.filter('','contains')
    }
    console.log(this.dataView)
  }
}
