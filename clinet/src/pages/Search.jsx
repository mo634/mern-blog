import React, { useEffect, useState } from 'react'
import { Select, TextInput } from "flowbite-react"
import { useLocation, useNavigate } from 'react-router-dom'
import RecentPosts from '../components/RecentPosts'
function Search() {
    //states 

    const [sidebarData, setSideBarData] = useState({
        searchTerm: "next",
        sort: "asc",
        category: "uncategorized"
    })

    const [showMore, setShowMore] = useState(true)
    const location = useLocation()

    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const URLParmas = new URLSearchParams(location.search);

        // take params from url 

        const searchTerm = URLParmas.get("searchTerm")

        const sort = URLParmas.get("sort")

        const category = URLParmas.get("category")

        // put the params in state 


        if (searchTerm || sort || category) {
            setSideBarData({
                ...sidebarData,
                searchTerm,
                sort,
                category
            })
        }

        const fetchPosts = async () => {

            setLoading(true)

            let searhcQuery = URLParmas.toString()


            if (!searchTerm) {
                searhcQuery = ""
            }

            const res = await fetch(`/api/post/get-posts?${searhcQuery}`,
                {
                    method: "POST"
                })

            const data = await res.json()

            if (res.ok) {
                setLoading(false)
                setPosts(data.posts)

                if (data.posts.length === 9) {

                    setShowMore(true)
                }

                else {
                    setShowMore(false)
                }
            }

            if (!res.ok) {
                setLoading(false);
                return;
            }


        }

        fetchPosts()
    }, [location.search])


    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("first")

        const urlParmas = new URLSearchParams(location.search)

        urlParmas.set("searchTerm", sidebarData.searchTerm)

        urlParmas.set("sort", sidebarData.sort)

        urlParmas.set("category", sidebarData.category)

        const searchQuery = urlParmas.toString()

        navigate(`/search?${searchQuery}`)

    }

    const handleChange = (e) => {
        if (e.target.id === "searchTerm") {
            setSideBarData({
                ...sidebarData,
                searchTerm: e.target.value
            })
        }

        if (e.target.id === "sort") {
            const order = e.target.value || 'desc';
            setSideBarData({
                ...sidebarData,
                sort: order
            })
        }
        if (e.target.id === "category") {
            const category = e.target.value || 'uncategorized';
            setSideBarData({
                ...sidebarData,
                category: category
            })
        }
    }

    const handleShowMore = async () => {
        const startIndex = posts.length

        const urlParmas = new URLSearchParams(location.search)

        urlParmas.set("startIndex", startIndex)

        const searchQuery = urlParmas.toString()

        const res = await fetch(`/api/post/get-posts?${searchQuery}`,
            {
                method: "POST"
            })

        const data = await res.json()

        if (res.ok) {
            setPosts([...posts, ...data.posts])
            if (data.posts.length === 9) {
                setShowMore(true)
            }
            else {
                setShowMore(false)
            }
        }

        if (!res.ok) {
            return
        }
    }

    return (<>

        <main className=' flex p-10 flex-col md:flex-row -md:justify-center -md:items-center -md:gap-3'>


            {/* sidebar */}

            <div className="  border-r md:w-[20%] w-full   border-r-gray-500 pr-4">
                <form onSubmit={handleSubmit}
                    className='flex flex-col gap-3'
                >

                    <label > search</label>
                    <TextInput
                        id='searchTerm'
                        value={sidebarData.searchTerm}
                        onChange={handleChange}
                    />

                    <label>sort</label>
                    <Select
                        id="sort"
                        value={sidebarData.sort}
                        onChange={handleChange}
                    >
                        <option value='desc'>Latest</option>
                        <option value='asc'>Oldest</option>
                    </Select>

                    <label>category</label>
                    <Select
                        id="category"
                        value={sidebarData.category}
                        onChange={handleChange}
                    >
                        <option value="next">next</option>
                        <option value="js">js</option>
                        <option value="react">react</option>
                        <option value="uncategorized">uncategorized</option>
                    </Select>

                    <button

                        className='w-full bg-teal-600 p-2 rounded-lg text-white hover:opacity-[0.7] duration-500'
                    >Apply filter</button>
                </form>
            </div>


            {/* content */}
            <div className="  w-[80%] flex flex-wrap gap-4 p-2 justify-center">
                {
                    loading ? <p>loading</p>
                        :
                        posts.map((post) => (
                            <RecentPosts key={post._id} post={post} />
                        ))
                }

            </div>

        </main>
        {showMore && <div className='w-full flex items-center justify-center p-4'>
            <button
            className=' text-teal-600 '
                onClick={handleShowMore}
            >show more </button>
        </div>}
    </>
    )
}

export default Search