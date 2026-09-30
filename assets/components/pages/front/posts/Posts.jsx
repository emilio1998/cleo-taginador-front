import React  from "react";
import Layout from "../../../layout/Layout";
import PostsContainer from "./PostsContainer";
import PostsContainerV2 from "./PostsContainerV2";

const Posts = () => {
    return (
        <Layout tituloHeader={"Posts"}>
            {/* <PostsContainer /> */}
            <PostsContainerV2 />
        </Layout>
    );
};

export default Posts;
