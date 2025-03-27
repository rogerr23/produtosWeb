import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { endpoins } from '../../../configurations/enviroments';

@Component({
  selector: 'app-consultar-produtos',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consultar-produtos.component.html',
  styleUrl: './consultar-produtos.component.css'
})
export class ConsultarProdutosComponent {

  produtos: any[] = [];
  mensagem: string = '';

  constructor(private http: HttpClient) { }

  // criando o formulário
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  // método para verificar se os campos estão com erro
  get f() {
    return this.form.controls;
  }

  // método para enviar o formulário
  onSubmit() {
    this.http.get('http://localhost:8084/api/produtos/consultar/' + this.form.value.nome).subscribe({
      next: (data) => {
        this.produtos = data as any[];
        this.mensagem = `Quantidade de registros encontrados: ${this.produtos.length}`;
      }
    })
  }

  // método para deletar um produto
  onDelete(id: string) {
    if (confirm('Deseja realmente excluir o produto selecionado? ')) {
      this.http.delete(`${endpoins.excluir_produto}/${id}`).subscribe({
        next: (data: any) => {
          this.mensagem = data.message;
          // remove o produto da lista e mantem somente os que tem o ID diferente
          this.produtos = this.produtos.filter(produto => produto.id !== id);
        }
      })
    }

  }

}
