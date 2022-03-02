import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EstudianteService } from 'src/app/service/estudiante.service';

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.css']
})
export class ListEstudiantesComponent implements OnInit {
  estudiantes: any [] = [];

  constructor(private _estudianteService:EstudianteService,
    private toastr: ToastrService) { 

    
  }




  ngOnInit(): void {
    this.getEstudiantes()
  }

  getEstudiantes(){
    this._estudianteService.getEstudiantes().subscribe(data=>{
      this.estudiantes = [];
      data.forEach((element:any) => {

        this.estudiantes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.estudiantes)
    });

}
  eliminarEstudiante(id: string){
    this._estudianteService.eliminarEstudiante(id).then(()=>{
      console.log('estudiante eliminado con exito');
      this.toastr.error('estudiante eliminado con exito','registro eliminado', {positionClass: 'toast-bottom-right'
      });
    }).catch(error=>{
      console.log(error);
    })
  }
}
