import React from 'react';
import { Link } from "react-router";

const Home = () => {
    return (
        <div>
                 <Link to="/StudentLogin">Student Login</Link>;
                  <Link to="/TeacherLogin">Teacher Login</Link>;
            <h1>Welcome to the School System</h1>
        </div>
    );
};

export default Home;