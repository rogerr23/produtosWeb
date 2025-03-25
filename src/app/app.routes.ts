import { Routes } from '@angular/router';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { ConsultarProdutosComponent } from './components/pages/consultar-produtos/consultar-produtos.component';
import { EdicaoProdutosComponent } from './components/pages/edicao-produtos/edicao-produtos.component';

export const routes: Routes = [
    {
        path: 'pages/cadastro-produtos',
        component: CadastroProdutosComponent
    },

    {
        path: 'pages/consultar-produtos',
        component: ConsultarProdutosComponent
    },

    {
        path: 'pages/edicao-produtos',
        component: EdicaoProdutosComponent
    }
];
