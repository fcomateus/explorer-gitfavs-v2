import { dataHandler } from "./dataHandler.js"

export class TableHandler extends dataHandler{
  constructor(root) {
    super(root)
    this.createRoles()

  }

  renderTable() {

    this.cleanRoles()
    this.createRoles()
  }

  cleanRoles() {
    this.tbody.querySelectorAll('tr').forEach(tr => tr.remove())

  }

  createRoles() {
    this.favorites.forEach(user => {
      const tr = document.createElement('tr')

      tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/${user.login}.png" alt="Imagem de ${user.name}">
        <a href="https://github.com/${user.login}" target="_blank">
        <p>${user.name}</p>
        <span>/${user.login}</span>
        </a>
      </td>
      <td class="repositories">${user.public_repos}</td>
      <td class="followers">${user.followers}</td>
      <td><button class="remove">Remover</button></td>`


      tr.querySelector('td button.remove').onclick = () => {
        const isOK = confirm('Tem certeza que deseja deletar esse usuário?');

        if(isOK){
          this.removeRole(user);
        }
      }

      this.tbody.append(tr)
  
    })

  }

  removeRole(user) {
    // this.favorites = this.favorites.filter( fav => user.username !== fav.username)
    this.delete(user)
    this.renderTable()
    this.save()
  }
}