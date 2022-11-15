import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  day: any;
  days: any;
  month: any;
  year: any;

  order_transaction = [];
  order_length = [];
  msg_news = [];
  msg_length = [];
  msg_news_string: string;
  intervalVar;

  table1 = "#192a56";
  table2 = "#273c75";
  color1: any = "#0000ff";
  color2: any = "#4d4dff";
  head_size: any = 20;
  head_color: any = "#ffffff";
  text_color: any = "#ffffff";
  text_size: any = 22;

  min1: any;
  max1: any;

  min2: any;
  max2: any;

  today: any

  min_in1: any = 1;
  max_in1: any = 15;

  min_in2: any = 16;
  max_in2: any = 30;

  checkfrom: any = 1;
  checkfromprof: any = 1;

  tableDisplay: any = ['d-none', '']
  tableDisplayResult: any

  titleDisplay: any = ['สถานะการจัดยา', 'หมายเลขที่เรียกผ่านไปแล้ว']
  titleDisplayResult: any

  public ddd: number = Date.now();

  clockElts = [];
  clockTimer = null;
  cpt = 0;

  constructor(private socket: Socket, private http: HttpClient) {
    this.socket.connect();

  }

  ngOnInit() {

    if (localStorage.getItem('checkfrom')) {
      this.checkfrom = localStorage.getItem('checkfrom');
    }
    if (localStorage.getItem('min_in1')) {
      this.min_in1 = localStorage.getItem('min_in1');
    }
    if (localStorage.getItem('max_in1')) {
      this.max_in1 = localStorage.getItem('max_in1');
    }
    if (localStorage.getItem('min_in2')) {
      this.min_in2 = localStorage.getItem('min_in2');
    }
    if (localStorage.getItem('max_in2')) {
      this.max_in2 = localStorage.getItem('max_in2');
    }
    if (localStorage.getItem('color1')) {
      this.color1 = localStorage.getItem('color1');
    }
    if (localStorage.getItem('color2')) {
      this.color2 = localStorage.getItem('color2');
    }
    if (localStorage.getItem('head_size')) {
      this.head_size = localStorage.getItem('head_size');
    }
    if (localStorage.getItem('head_color')) {
      this.head_color = localStorage.getItem('head_color');
    }
    if (localStorage.getItem('text_size')) {
      this.text_size = localStorage.getItem('text_size');
    }
    if (localStorage.getItem('text_color')) {
      this.text_color = localStorage.getItem('text_color');
    }

    console.log(localStorage.getItem('checkfrom'))
    console.log(localStorage.getItem('min_in1'))
    console.log(localStorage.getItem('max_in1'))
    console.log(localStorage.getItem('min_in2'))
    console.log(localStorage.getItem('max_in2'))
    console.log(localStorage.getItem('color1'))
    console.log(localStorage.getItem('color2'))
    console.log(localStorage.getItem('head_size'))
    console.log(localStorage.getItem('head_color'))
    console.log(localStorage.getItem('text_size'))
    console.log(localStorage.getItem('text_color'))
    
    this.checkfromprof = this.checkfrom;
    this.tableDisplayResult = this.tableDisplay[this.checkfromprof - 1];
    this.titleDisplayResult = this.titleDisplay[this.checkfromprof - 1];

    document.documentElement.style.setProperty("--main-background-color1", this.table1);
    document.documentElement.style.setProperty("--main-background-color2", this.table2);

    this.socket.fromEvent('day').subscribe(message => {
      this.day = message;
    })
    this.socket.fromEvent('days').subscribe(message => {
      this.days = message;
    })
    this.socket.fromEvent('month').subscribe(message => {
      this.month = message;
    })
    this.socket.fromEvent('year').subscribe(message => {
      this.year = message;
    })

    this.socket.fromEvent('time').subscribe(message => {
      this.today = message;
    })

    this.socket.fromEvent('order_transaction_head_next').subscribe(message => {
      if (this.checkfromprof == 2) {
        this.order_length = [];
        this.order_transaction = [];
        this.order_length.push(message);
        console.log(message);
        for (let i = 0; i < 100; i++) {
          if (i < this.order_length[0].length) {
            this.order_transaction.push(message[i]);
            console.log(this.order_transaction);
          } else {
            this.order_transaction.push({
              hn: "xxxxxx",
              internal_que: "xxxx",
              order_state: "xxxxxxx",
              state_color: "xxxxxxx",
              state_description: "xxxxxxx",
              state_name: "xxxxxxx"
            });
          }
        }
      }
    })

    this.socket.fromEvent('order_transaction_head').subscribe(message => {
      if (this.checkfromprof == 1) {
        this.order_length = [];
        this.order_transaction = [];
        this.order_length.push(message);
        console.log(message);
        for (let i = 0; i < 100; i++) {
          if (i < this.order_length[0].length) {
            this.order_transaction.push(message[i]);
            console.log(this.order_transaction);
          } else {
            this.order_transaction.push({
              hn: "xxxxxx",
              internal_que: "xxxx",
              order_state: "xxxxxxx",
              state_color: "xxxxxxx",
              state_description: "xxxxxxx",
              state_name: "xxxxxxx"
            });
          }
        }
      }
    })

    this.http.get('http://192.168.15.245:3030/api/news').subscribe((response) => {
      console.log(response);
      this.msg_news.push(response);

      for (let i = 0; i < this.msg_news[0].length; i++) {
        setTimeout(() => {
          this.msg_length = [];
          this.msg_length.push(response[i].msg);
          this.msg_news_string = this.msg_length[0];
        }, 20000 * i)
      }

    });
    this.min1 = this.min_in1 - 1;
    this.max1 = this.max_in1;

    this.min2 = this.min_in2 - 1;
    this.max2 = this.max_in2;

    document.documentElement.style.setProperty("--main-background-color1", this.color1);
    document.documentElement.style.setProperty("--main-background-color2", this.color2);
    document.documentElement.style.setProperty("--color-head", this.head_color);
    document.documentElement.style.setProperty("--color-text", this.text_color);

  }



  _currentDate$() {
    let monthNamesThai = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม"];
    let dayNames = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
    var d = new Date();
    this.day = dayNames[d.getDay()];
    this.days = d.getDate();
    this.month = monthNamesThai[d.getMonth()];
    this.year = d.getFullYear() + 543;
    console.log("The current Date is  " + this.day + "  " + this.days + "" + this.month + "  " + this.year);
  }

  setting() {

    this.min1 = this.min_in1 - 1;
    this.max1 = this.max_in1;
    this.min2 = this.min_in2 - 1;
    this.max2 = this.max_in2;
    document.documentElement.style.setProperty("--main-background-color1", this.color1);
    document.documentElement.style.setProperty("--main-background-color2", this.color2);
    document.documentElement.style.setProperty("--color-head", this.head_color);
    document.documentElement.style.setProperty("--color-text", this.text_color);
    this.checkfromprof = this.checkfrom;
    this.tableDisplayResult = this.tableDisplay[this.checkfromprof - 1];
    this.titleDisplayResult = this.titleDisplay[this.checkfromprof - 1];

    //local storage
    localStorage.setItem('checkfrom', this.checkfrom);
    localStorage.setItem('min_in1', this.min_in1);
    localStorage.setItem('max_in1', this.max_in1);
    localStorage.setItem('min_in2', this.min_in2);
    localStorage.setItem('max_in2', this.max_in2);
    localStorage.setItem('color1', this.color1);
    localStorage.setItem('color2', this.color2);
    localStorage.setItem('head_size', this.head_size);
    localStorage.setItem('head_color', this.head_color);
    localStorage.setItem('text_size', this.text_size);
    localStorage.setItem('text_color', this.text_color);

    console.log(localStorage.getItem('checkfrom'))
    console.log(localStorage.getItem('min_in1'))
    console.log(localStorage.getItem('max_in1'))
    console.log(localStorage.getItem('min_in2'))
    console.log(localStorage.getItem('max_in2'))
    console.log(localStorage.getItem('color1'))
    console.log(localStorage.getItem('color2'))
    console.log(localStorage.getItem('head_size'))
    console.log(localStorage.getItem('head_color'))
    console.log(localStorage.getItem('text_size'))
    console.log(localStorage.getItem('text_color'))

  }



}
