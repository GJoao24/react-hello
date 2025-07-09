import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Lista } from "./Lista";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
            <Lista/>
		</div>
	);
};

export default Home;