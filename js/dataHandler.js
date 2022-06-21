export class dataHandler {
  constructor(root) {
    // this.favorites = [
    //   {
    //     name: 'Francisco Mateus',
    //     login: 'r0dzera',
    //     public_repos: 777,
    //     followers: 777
    //   },
    //   {
    //     name: 'Mayk Brito',
    //     login: 'maykbrito',
    //     public_repos: 123,
    //     followers: 4
    //   },
    //   {
    //     name: 'Diego Fernandes',
    //     login: 'diego3g',
    //     public_repos: 333,
    //     followers: 5512
    //   },
    //   {
    //     name: 'Davi Gregório',
    //     login: 'DaviGGA',
    //     public_repos: 1,
    //     followers: 1
    //   }
    // ]
    this.favorites = JSON.parse(localStorage.getItem('@git-favs:')) || []

    this.root = document.querySelector('#app')
    this.tbody = document.querySelector(`${root} table tbody`)
    this.configAdd()
  }

  save() {
    localStorage.setItem('@git-favs:', JSON.stringify(this.favorites))
  }

  delete(user) {
    this.favorites = this.favorites.filter(fav => user.login !== fav.login)
    this.save()
  }

  configAdd() {
    const favButton = document.querySelector('.favorite')

    favButton.onclick = () => {
      const { value } = document.querySelector('#search')
      document.querySelector('#search').value = ''

      this.add(value)
    }
  }

  async add(user) {
    try {
      const alreadyAdded = this.favorites.find(fav => fav.login === user
      )

      if (alreadyAdded) {
        throw new Error('Usuário já cadastrado!')
      }

      const endpoint = `https://api.github.com/users/${user}`

      const response = await fetch(endpoint)
      const data = await response.json()

      const { name, login, public_repos, followers } = data

      if(login === undefined){
        throw new Error('Usuário não encontrado!')
      }

      const newUser = { name, login, public_repos, followers }

      this.favorites = [newUser, ...this.favorites]

      this.save()
      this.renderTable()
    } catch (e) {
      alert(e.message)
    }
  }
}
