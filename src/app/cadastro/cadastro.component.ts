import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConsultaCepService } from "../service/consulta-cep.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService,
    private http: HttpClient) {}

  ngOnInit(): void {}

  cadastrar(form: NgForm) {
    if(form.valid) {
      this.router.navigate(['./sucesso'])
    } else {
      alert('Formulario invalido')
    }
  }

  consultaCEP(ev: any, f: any) {
    const cep = ev.target.value;
    cep !== '' ?
     this.consultaCepService.getConsultaCep(cep)
     .subscribe(resultado => {
      console.log(resultado)
      this.populaDadosForms(resultado, f)
     } ) : '';
  }
  
  populaDadosForms(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }
}
