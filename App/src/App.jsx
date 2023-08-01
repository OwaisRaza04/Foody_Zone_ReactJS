import { useEffect, useState } from 'react'
import styled from "styled-components";
import SearchResult from './components/SearchResult';



export const BASE_URL = "http://localhost:9000";

function App() {

  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");



  useEffect(() => {                          // useEffect is react hook which is used to render something(data) after rendering components
    const fetchFoodData = async () => {      // async is used to make function asynchronous means it will always return promise
                                             // promise is object is js which which represent state of operation (success, failure)
                                             // and await is used to wait untill the promise is resolved
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
    // console.log(data);
  }, []);

function searchFood(event){
    const searchValue = event.target.value;

    // console.log(searchValue);

    if(searchValue === ""){
      setFilteredData(null);
    } 
      
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredData(filter);
  }

  function filterFood(type){

    if(type === "All"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    )
    setFilteredData(filter);
    setSelectedBtn(type);
  }


 const filterBtns =[{"type": "All"}, {"type": "Breakfast"}, {"type": "lunch"}, {"type": "Dinner"}];

 


  return ( <Container>
              <TopContainer>
                  <div className='logo'>
                    <img src="/logo.svg" alt="logo image" />
                  </div>

                  <div className='search'>
                    <input onChange={searchFood} type="text" placeholder='Search Food'/>
                  </div>
              </TopContainer>

              <FilterContainer>
                  {filterBtns?.map((filterBtn) => 
                  <Button
                   isSelected={selectedBtn === filterBtn.type} 
                   onClick={() => filterFood(filterBtn.type)}
                   >
                    {filterBtn.type}
                    </Button>
                  )}

                  {/* <Button onClick={() => filterFood("All")}>All</Button>
                  <Button onClick={() => filterFood("Breakfast")}>Breakfast</Button>
                  <Button onClick={() => filterFood("Lunch")}>Lunch</Button>
                  <Button onClick={() => filterFood("Dinner")}>Dinner</Button> */}
              </FilterContainer>

              <SearchResult data={filteredData}/>
          </Container>
    
  )
}

export default App;

const Container = styled.div`

  /* max-width: 1200px; */
  margin: 0 auto;

`;


const TopContainer = styled.section`

  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;  

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      outline: none;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }

`;

const FilterContainer = styled.section`

  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;

`;

export const Button = styled.button`

  border-radius: 5px;
  background-color: ${({isSelected}) => (isSelected ? "#de0d0d" : "#ff4343")};
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }


`;



