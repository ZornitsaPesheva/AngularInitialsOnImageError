import { Component } from '@angular/core';
import OrgChart from "@balkangraph/orgchart.js";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  



export class AppComponent {
  title = 'orgchart';



  constructor() { 
  }

  ngOnInit() {

        let nodes = [
            { id: 1, "Employee Name": "Denny Curtis", Title: "CEO", Photo: "https://cdn.balkan.app/shared/2.jpg" },
            { id: 2, pid: 1, "Employee Name": "Ashley Barnett", Title: "Sales Manager", Photo: "https://cdn.balkan.app/shared/54643.jpg" },
            { id: 3, pid: 1, "Employee Name": "Caden Ellison", Title: "Dev Manager", Photo: "https://cdn.balkan.app/shared/4.jpg" },
            { id: 4, pid: 2, "Employee Name": "Elliot Patel", Title: "Sales", Photo: "https://cdn.balkan.app/shared/5.jpg" },
            { id: 5, pid: 2, "Employee Name": "Lynn Hussain", Title: "Sales", Photo: "https://cdn.balkan.app/shared/6.jpg" },
            { id: 6, pid: 3, "Employee Name": "Tanner May", Title: "Developer", Photo: "https://cdn.balkan.app/shared/7.jpg" },
            { id: 7, pid: 3, "Employee Name": "Fran Parsons", Title: "Developer", Photo: "https://cdn.balkan.app/shared/8.jpg" }
        ];



        OrgChart.templates["ula"].img_0 = '<clipPath id="{randId}"><circle cx="50" cy="60" r="40"></circle></clipPath><image data-change-use-default-image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="20" width="80" height="80" ></image>';

        const tree = document.getElementById('tree');
        if (tree) {
            var chart = new OrgChart(tree, {
                template: "ula",
                nodeBinding: {
                    field_0: "Employee Name",
                    field_1: "Title", 
                    img_0: "Photo",
                },
                nodeMenu: {
                    details: { text: "Details" },
                    edit: { text: "Edit" },
                    add: { text: "Add" }
                }        
            });


            chart.onRedraw(function(){
                var changeUseDefaultImageElements = this.element.querySelectorAll('[data-change-use-default-image]');
                for (var i = 0; i < changeUseDefaultImageElements.length; i++){
                    var changeUseDefaultImageElement = changeUseDefaultImageElements[i];
                    changeUseDefaultImageElement.addEventListener('error', function(e){
                        var image = e.target as HTMLElement;
                        if (image != null) {
                            var errImg = image.getAttribute("xlink:href");
                            var node = nodes.find( ({ Photo }) => Photo === errImg );
                            var errImg = image.getAttribute("xlink:href");
                            var node = nodes.find(({ Photo }) => Photo === errImg);
                            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            circle.setAttribute("cx", "50"); 
                            circle.setAttribute("cy", "60"); 
                            circle.setAttribute("r", "41"); 
                            circle.setAttribute("fill", "white"); 
                        
                            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            // @ts-ignore
                            var name = node["Employee Name"];
                            var initials = name.split(" ").map((n)=>n[0]).join(".")  + ".";
                            text.innerHTML = initials;
                            text.setAttribute("x", "25"); 
                            text.setAttribute("y", "60");
                            text.setAttribute("fill", "#039BE5");
                            text.setAttribute("style", "font-size: 24px;");
                            image.parentNode?.appendChild(circle);
                            image.parentNode?.appendChild(text);
                        
                            //to set image insted of initials, use the code below   
                            image.setAttribute("href", "https://cdn.balkan.app/shared/OrgChart-JS.svg")
                        }
                    })
                }
            })

            chart.load(nodes);
        }
    }
}



