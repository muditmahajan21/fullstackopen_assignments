import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Notification />
      <AnecdoteList />
      <br />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

export default App