import React, { useState }  from "react";
import Layout from "../../../layout/Layout";
import PostsContainer from "./PostsContainer";
import PostsContainerV2 from "./PostsContainerV2";

const Posts = () => {

    const [mostrarTags, setMostrarTags] = useState(true);

    return (
        <Layout tituloHeader={"Posts"} mostrarTags={mostrarTags}>
            {/* <PostsContainer /> */}
            <PostsContainerV2 setMostrarTags={setMostrarTags} />
        </Layout>
    );
};

export default Posts;
