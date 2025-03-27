import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { endpoins } from '../../../configurations/enviroments';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {

  mensagem: string = '';
  categorias: any[] = []; // array de objetos JSON

  constructor(private http: HttpClient) { }

  // função executada ao iniciar o componente
  ngOnInit() {
    // fazendo uma requisição GET para a API
    this.http.get(endpoins.consultar_categorias).subscribe({
      next: (data) => {
        this.categorias = data as any[];
      }
    })
  }

  // declaranod o formulario
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    preco: new FormControl('', [Validators.required, Validators.min(0.01)]),
    quantidade: new FormControl('', [Validators.required, Validators.min(0)]),
    categoriaId: new FormControl('', [Validators.required])
  });

  // função auxiliar para verificar se tudo foi preenchido corretamente
  get f() {
    return this.form.controls;
  }

  // função para capturar o evento SUBMIT do formulário
  onSubmit() {

    // fazendo uma requisição POST para o endpoint de cadastro de produtos
    this.http.post(endpoins.cadastrar_produto, this.form.value).subscribe({
      next: (data: any) => {
        this.mensagem = data.message;
        this.form.reset();
      }
    })
  }

}
