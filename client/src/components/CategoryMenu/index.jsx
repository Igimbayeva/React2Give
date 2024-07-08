import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_MOST_POPULAR,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  const categoryIcons = [
    { name: 'Event Tickets', icon: "fa-solid fa-ticket" }, // 0
    { name: 'Student Artworks', icon: "fa-solid fa-paintbrush"  }, // 1
    { name: 'Electronics', icon: "fa-solid fa-ticket"  }, // 2
    { name: 'Books', icon: "fa-solid fa-ticket"  }, // 3
    { name: 'Donations', icon: "fa-solid fa-ticket"  } // 4
  ]

  const handlePopularClick = () => {
    console.log("Hello")
    dispatch({
      type: UPDATE_MOST_POPULAR,
      currentCategory: "POPULAR",
    });
  };

  const handleHover = () => {
    document.getElementById("product-list").classList.add("pl-[150px]")
  }

  const handleLeave = () => {
    document.getElementById("product-list").classList.remove("pl-[150px]")
  }

  return (
    <div class="min-h-screen bg-gray-100 left-[0px] absolute"
     onMouseOver={handleHover}
     onMouseLeave={handleLeave}
     >
      <div class="sidebar w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg">
        <div class="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <h5 class="-mr-1 font-medium">Select Category</h5>
            <ul class="mt-6 space-y-2 tracking-wide">
              {categories.map((item) => (
                <li
                  key={item._id}
                  class="min-w-max"
                  onClick={() => {
                    handleClick(item._id);
                  }}>
                  <a href="#" class="relative flex items-center space-x-4 bg-gradient-to-r from-red-800 to-red-600 px-4 py-3 text-white">
                    <i class={
                      categoryIcons.find(category => {
                        if(item.name == category.name) {
                          return true;
                        }
                      }).icon
                    }></i>
                    <span class="-mr-1 font-medium"> {item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="w-max -mb-3">
            <a href="#" class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:fill-cyan-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
              <span class="group-hover:text-gray-700">Settings</span>
            </a>
          </div>
        </div>
      </div>


      {/* <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button onClick={() => { handleClick('') }}>
        All
      </button>
      <button onClick={() => { handlePopularClick() }}>
        Most Popular
      </button> */}
    </div>
  );
}

export default CategoryMenu;
