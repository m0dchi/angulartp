import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { TestService } from "../services/test.service"
import { Data } from "../models/data"
import { Phone } from "../models/phones"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: "app-testcomp",
  templateUrl: "./testcomp.component.html",
  styleUrl: "./testcomp.component.css"
})
export class TestcompComponent implements OnInit {
  phoneList = new Array<Phone>()
  phone = new Phone()
  data = new Data()
  @Input() name: string
  @Input() price: number
  @Input() color: string
  @Input() id2: string
  @Input() name2: string
  @Input() price2: number
  @Input() color2: string
  @ViewChild("see") see: any

  constructor(
    private TestService: TestService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.TestService.getAll().subscribe(response => {
        this.phoneList = response
        this.clearInputs()
      },
      error => {
        console.log(error)
      }
    );
  }

  save() {
    this.phone.name = this.name
    this.data.price = this.price
    this.data.color = this.color
    this.phone.data = this.data
    this.TestService.save(this.phone).subscribe((response) => {
      this.insertTr(response)
    }, error => {
      console.log(error)
    })
  }

  delete(id: string) {
    this.TestService.delete(id).subscribe(() => {
      document.getElementById(id)?.remove();
      this.clearInputs();
    });
  }


  clearInputs() {
    document.getElementsByTagName('input')[0].value = ''
    document.getElementsByTagName('input')[1].value = ''
    document.getElementsByTagName('input')[2].value = ''
    document.getElementsByTagName('input')[0].focus()
  }

  hasProp(o: Data, name: string) {
    return o.hasOwnProperty(name)
  }

  insertTr(response: Phone) {
    var tbody = document.getElementsByTagName('tbody')[0]
    var row = tbody.insertRow()
    row.setAttribute('id', response.id.toString())

    var cell = row.insertCell()
    cell.className = 'table-cell'
    cell.innerHTML = response.id.toString()
  
    cell = row.insertCell()
    cell.className = 'table-cell'
    cell.innerHTML = response.name ?? 'No name'
  
    cell = row.insertCell()
    cell.className = 'table-cell'
    cell.innerHTML = response.data.price.toString()
  
    cell = row.insertCell()
    cell.className = 'table-cell'
    cell.innerHTML = response.data.color
  
    cell = row.insertCell()
    cell.className = 'table-cell'
    var button = document.createElement('button')
    button.innerHTML = "VIEW"
    button.addEventListener('click', () => { this.view(this.see, response); })
    cell.appendChild(button)
  
    cell = row.insertCell()
    cell.className = 'table-cell'
    button = document.createElement('button')
    button.innerHTML = "DELETE"
    button.addEventListener('click', () => { this.delete(response.id.toString()); })
    cell.appendChild(button)
  
    this.clearInputs()
  }
  

  view(see: any, phone: Phone) {
    this.id2 = phone.id
    this.name2 = phone.name
    this.price2 = phone.data.price
    this.color2 = phone.data.color
    this.modalService.open(see).result.then(() => {
      this.phone.id = this.id2
      this.phone.name = this.name2
      this.data.price = this.price2
      this.data.color = this.color2
      this.phone.data = this.data
      this.TestService.update(this.phone).subscribe((response) => {
        document.getElementById(response.id)?.remove()
        this.insertTr(response)
      }, error => {
        console.log(error)
      })
    })
  }
}