import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import {storage, firestore} from "../../firebase/firebase"
import { useContext } from 'react';
import { DataBaseDataContext } from '../../contexts/DataBaseDataContext';
import fallbackImage from "../../img/KTPLogo.jpeg";
import axios from 'axios';
import ViewANdEditMember from './BatchAddMembers';
import Modal from 'react-modal';
import "./main.css"

import SideMenu from '../../components/Admin/SideMenu';

const backendUrl = import.meta.env.VITE_LOCAL_BACKEND_URL; //change back to VITE_BACKEND_URL for production


export default function AdminDashboard(){

    const [sideMenuToggled, toggleSideMenu] = useState(false)
      const dataContext = useContext(DataBaseDataContext) as DataBaseDataContextType | null;
      const userData = dataContext?.userData;


interface User {
  WebsitePhotoURL: string;
  id: string;
  Position?: number;
  Eboard_Position?: string;
  websitePic?: string;
  LinkedIn?: string;
  FirstName?: string;
  LastName?: string;
  Class?: string;
  pictureUrl?: string | null;
  Clout?: string;
  BUEmail?: string;
  Major?: string;
  Minor?: string;
  GradYear?: string;
  Colleges?: string;
}

interface DataBaseDataContextType {
  userData?: User[];
}

async function getUserByEmail(email:String){
    const res = await axios.get(`${backendUrl}/users/email/${email}`)
    console.log(res.data)
    return res.data
}



function getUserByName(name: string): User[] {
    const lowerName = name.toLowerCase();
    const splittedName = name.split(" ")


    if (splittedName.length > 1){
        let firstName = splittedName[0].toLowerCase()
        let lastName = splittedName[1].toLowerCase()
        
        return (userData ?? []).filter(user =>
        user.FirstName?.toLowerCase().includes(firstName)
        &&
        user.LastName?.toLowerCase().includes(lastName)
    );
    }

    return (userData ?? []).filter(user =>
     user.FirstName?.toLowerCase().includes(lowerName) 
        ||
        user.LastName?.toLowerCase().includes(lowerName)
    );

}

    const filters = ["Eboard Position", "Class Year", "Position"]
    const [queryResults, setQueryResults] = useState([] as User[]);
    const [searchQuery, setSearchQuery] = useState("");
    const allBrothers = (data : User[]) =>  {

        return (
                            <div className="flex flex-col items-center justify-center w-full md:w-max transition-all duration-300 gap-y-2.5">
                    {

                        data?.map((user, idx)=>

                            <div
                            onClick = {() =>{
                                setModalOpen(true)
                                console.log(user)
                                setUserClicked(user); 
                            }}
                            key={idx}
                            className={`hover:bg-gray-300 cursor-pointer text-center flex flex-row w-full md:w-[50rem] justify-between items-center h-auto md:h-[75px] px-2 py-2 md:py-0 transition-all duration-300 ${sideMenuToggled ? 'md:pl-[200px]' : 'pl-0'}`}>



                                <img src={user.WebsitePhotoURL ?? fallbackImage} className="h-10 md:h-[50px] aspect-auto rounded-sm" />
                                <p className="text-center flex-1 text-sm md:text-base">{user.FirstName} {user.LastName}</p>

                            </div>
                            )

                    }
                        </div>

    )
}

function handleInputSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(searchQuery.includes("@")){
        getUserByEmail(searchQuery)
        .then(res =>{
            setQueryResults(res)
        })
        .catch(err =>{
            setQueryResults([])
            console.log("Error fetching user by email: ", err)
        })
    }else{
        const results = getUserByName(searchQuery);
        setQueryResults(results);
        console.log(results);
    }
}

//Modal attributes: 
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const [modalOpen, setModalOpen] = useState(false)
const [userClicked, setUserClicked] = useState<User | null>(null)
const [editMode, seteditMode] = useState(false) 




    return(
        <div className="p-4 md:p-8 max-w-auto mx-auto bg-[rgb(248,247,252)] min-h-screen" id="SideMenuContainer">

            <SideMenu/>
 

                  <main className="flex pt-8 md:pt-[50px] gap-4 flex-col-reverse md:flex-row items-center md:items-start justify-center max-w-[100vw] bg-transparent">

                
                        {queryResults.length > 0 ? allBrothers(queryResults) : allBrothers(userData ?? [])}



                        <div className="flex flex-col gap-x-5 items-start justify-start relative h-max bg-transparent right-0 w-full md:w-auto">
                        <form onSubmit={handleInputSubmit} className="w-full">
                        <input placeholder='search' className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md" onChange={(e) =>{
                            setSearchQuery(e.target.value)
                            }} />
                            </form>

                        <div className="h-auto mt-6">
                            {
                                filters.map((itm, idx) => <h1 key={idx} className={`text-base md:text-xl ${idx > 0 ? "border-t border-black" : ""}`}>{itm}</h1>)
                            }
                        </div>
                    </div>


                    <Modal 

                    style = {{
                        overlay:{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            transitionDuration:"0.5s"

                        },

                        content:{
                            border:"solid 1px lightgray",
                            outline:"none",
                            borderRadius: 10,
                            backgroundColor:"white",
                            padding: 0,
                            display:"flex",
                            alignContent:"center",
                            justifyContent:"flex-start",
                            alignItems:"flex-start",
                            selfAlign:"center",
                            transitionDuration:"0.5s"

                        }
                    }}
                    isOpen = {modalOpen}
                    contentLabel = "ViewEditMember Modal"

                    >
                        <div style = {{
                            width:"auto",
                            height: "auto",
                            alignContent:"center",
                            padding: "100px 0px 0px 100px",
                            justifyContent:"center",
                            alignItems:"center"
                        }}>

                            <div style = {{
                                display:"flex",
                                flexDirection:"row",
                                gap: 100
                            }}>
                         <img src={userClicked?.WebsitePhotoURL ?? fallbackImage} className="h-10 md:h-[400px] aspect-auto rounded-sm" />
                         <div id = "detailsColumn" style = {{
                            alignItems:"flex-start",
                            flexDirection:"column",
                            display:"flex",
                            justifyContent:"flex-start",

                         }}>
                            {
                                !editMode?
                            <>
                            <p>Clout: {userClicked?.Clout ?? null}</p>
                            <p>Position: {userClicked?.Position ?? null}</p>
                            <p>Name: {userClicked?.FirstName ?? null} {userClicked?.LastName ?? null}</p>
                            <p>BUEmail: {userClicked?.BUEmail ?? null}</p>
                            <p>Major: {userClicked?.Major }</p>

                            {
                            userClicked?.Minor && <p>Minor: {userClicked?.Minor}</p>
                            }

                            <p>GradYear: {userClicked?.GradYear ?? null}</p>
                            <p>Class: {userClicked?.Class ?? "None"}</p>
                            <p>Colleges: {userClicked?.Colleges ?? "None"}</p>

                            </>
                            :
                            <>
                            <p>Clout: <input type="text" placeholder={userClicked?.Clout ?? ''} /></p>
                            <p>Position: <input type="text" placeholder={String(userClicked?.Position ?? '')} /></p>
                            <p >First Name: <input type="text" placeholder={userClicked?.FirstName ?? ''} /> </p>
                            <p >Last Name <input type="text" placeholder={userClicked?.LastName ?? ''} /></p>
                            <p>BUEmail: <input type="text" placeholder={userClicked?.BUEmail ?? ''} /></p>
                            <p>Major: <input type="text" placeholder={userClicked?.Major ?? ''} /></p>
                            <p>Minor: <input type="text" placeholder={userClicked?.Minor ?? ''} /></p>
                            <p>GradYear: <input type="text" placeholder={userClicked?.GradYear ?? ''} /></p>
                            <p>Class: <input type="text" placeholder={userClicked?.Class ?? 'None'} /></p>
                            <p>Colleges: <input type="text" placeholder={userClicked?.Colleges ?? ''} /></p>
                            </>
                            }

                            </div>
                            </div>


                    <div
                    id = "Controls"
                    style = {{
                        width: "auto",

                        display:"flex",
                        alignSelf:"flex-end",
                        position:"absolute",
                        bottom: 50,
                        right: 50,
                        flexDirection:"row",
                        gap: 20
                    }}
                    >

                        {
                        !editMode?
                           <>  
                        <button
                        style = {{
                         backgroundColor:"#004C96",
                            border: `solid 1px #004C96`,
                         borderRadius: 4, 
                             alignContent:"center",
                        display:"flex",
                        cursor:"pointer",
                        transitionDuration:"1s",
                        color:"white",
                        paddingInline: 24,
                        paddingBlock: 2,
                        fontSize: 20,
                
                            }}
                            onClick={ () => seteditMode(true)}
                        >

                            Edit

                        </button>


                           <button
                        style = {{
                         backgroundColor:"#004C96",
                            border: `solid 1px #004C96`,
                         borderRadius: 4, 
                             alignContent:"center",
                        display:"flex",
                        cursor:"pointer",
                        transitionDuration:"1s",
                        color:"white",
                        paddingInline: 24,
                        paddingBlock: 2,
                        fontSize: 20

                            }}
                            onClick={ () => setModalOpen(false)}
                        >

                            Close

                        </button>
                        </>
                        :

                        <>
                          <button
                        style = {{
                         backgroundColor:"#004C96",
                            border: `solid 1px #004C96`,
                         borderRadius: 4, 
                             alignContent:"center",
                        display:"flex",
                        cursor:"pointer",

                        color:"white",
                        paddingInline: 24,
                        paddingBlock: 2,
                        fontSize: 20

                            }}
                            onClick={ () => seteditMode(false)}
                        >

                            Save

                        </button>

                          <button
                        style = {{
                         backgroundColor:"transparent",
                            border: `solid 1px #004C96`,
                         borderRadius: 4, 
                             alignContent:"center",
                        display:"flex",
                        cursor:"pointer",

                        color:"#004C96",
                        paddingInline: 24,
                        paddingBlock: 2,
                        fontSize: 20

                            }}
                            onClick={ () => setModalOpen(false)}
                        >

                            Discard

                        </button>
                        </>
                        
                        }
                    

                        </div>



                        </div>
                    </Modal>

                </main>




        </div>
    )
}
