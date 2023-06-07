import { Form } from "react-router-dom";
import { UserPlusIcon } from '@heroicons/react/24/solid'
import illustration from "../assets/illustration.jpg"
import { Link } from "react-router-dom";

const Intro = () => {
    return ( 
        <div className="intro">
            <div>
            <h1>Monitor Your <span className="accent">Finances</span></h1>
            <p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
          <Form method="post">
            <input 
            type="text" 
            name="userName" 
            required 
            placeholder="What is your name?" 
            aria-label="Your Name"  
            autoComplete="given-name"/>
            <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark"> <Link to={'/login'}> </Link>
          <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
          </Form>
          </div>
          <img src={illustration} alt="person with money" width={600}/>
        </div>
     );
}
 
export default Intro;