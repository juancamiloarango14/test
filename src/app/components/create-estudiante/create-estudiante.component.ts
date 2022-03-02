import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-create-estudiante',
  templateUrl: './create-estudiante.component.html',
  styleUrls: ['./create-estudiante.component.css']
})
export class CreateEstudianteComponent implements OnInit {
  createEstudiante: FormGroup;
  Submitted=false;
  loading=false;
  id: string | null;
  titulo = 'Agregar nuevo estudiante';

  constructor(private fb: FormBuilder, 
              private estudianteService: EstudianteService,
              private router:Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
    this.createEstudiante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      codigo: ['', Validators.required],
      curso: ['', Validators.required]
    })
    this.id=this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEstudiante(){
    this.Submitted=true;

    if (this.createEstudiante.invalid){
      return;
    }
    if(this.id===null){
      this.agregarEstudiante();
    }else{
      this.editarEstudiante(this.id);
    }
   
  }  
  agregarEstudiante()  {
    const estudiante: any = {
      nombre: this.createEstudiante.value.nombre,
      apellido: this.createEstudiante.value.apellido,
      codigo: this.createEstudiante.value.codigo,
      curso: this.createEstudiante.value.curso,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading=true;
    this.estudianteService.agregarEstudiante(estudiante).then(() =>{
      this.toastr.success('Estudiante Registrado con exito', 'estudiante registrado',{positionClass:'toast-bottom-right'});
      this.loading=false;
      this.router.navigate(['/list-estudiantes']);
    }).catch(error=> {
      console.log(error);
      this.loading=false;
    })
  }
  

  editarEstudiante (id:string){
    const estudiante: any = {
      nombre: this.createEstudiante.value.nombre,
      apellido: this.createEstudiante.value.apellido,
      codigo: this.createEstudiante.value.codigo,
      curso: this.createEstudiante.value.curso,
      fechaActualizacion: new Date()
    }


    this.loading=true; 

    this.estudianteService.actualizarEstudiante(id, estudiante).then(() =>{
      this.loading=false;
      this.toastr.info('El estudiante fue editado con exito','Estudiante editado', {
        positionClass:'toast-bottom-right'
      })
      this.router.navigate(['/list-estudiantes']);
    })
  }



  esEditar(){
    this.titulo='Editar estudiante'
    if (this.id !==null){
      this.loading=true;
      this.estudianteService.getEstudiante(this.id).subscribe(data => {
        this.loading=false;
        this.createEstudiante.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          codigo: data.payload.data()['codigo'],
          curso: data.payload.data()['curso']
        })
      })
    }
  }

}

