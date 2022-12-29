import{Component} from 'react'
import { ButtonNextPage } from '../../components/ButtonNextPage';
import { Posts } from '../../components/Posts';
import { SearchInput } from '../../components/SearchInput';
import { loadPosts } from '../../utils/loadPosts';
import './styles.css';

class Home extends Component {
  state = {
    posts:[],
    allPosts:[],
    page: 0,
    postsPerPage: 2,
    searchValue:''
  }

  componentDidMount(){
    this.loadPosts()
  }

  loadMorePosts = () => {
    const {page, postsPerPage, allPosts, posts} = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }


//pega os dados da API converte em JSON e altera o estado
//utilizado promise.all pois sera feita a requisição a duas APIs em paralelo
  loadPosts = async () => {
    const {page, postsPerPage} = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage), 
      allPosts: postsAndPhotos
    })
  }

  handleChange = (e) => {
    const {value} = e.target
    this.setState({searchValue: value})
  }

  render(){ 
    //cria uma copia do estado
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post =>{return post.title.toLowerCase().includes(searchValue.toLowerCase())}) 
    : posts

    return(
      <section className='container'>

        <SearchInput searchValue={searchValue} handleChange={this.handleChange}/>
        {filteredPosts.length
          ? 
            <Posts posts = {filteredPosts}/>
          :
            <p>Nenhum Resultado Encontrado</p>
        }
        
        {!searchValue && (
          <div className='button-container'>
            <ButtonNextPage text={'Load More Posts'} onClick={this.loadMorePosts} disabled={noMorePosts}/>
          </div>        
        )}

      </section>
    )
  }

}

export default Home;
