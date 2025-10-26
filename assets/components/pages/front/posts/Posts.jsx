import React  from "react";
import Layout from "../../../layout/Layout";
import PostsContainer from "./PostsContainer";

const Posts = () => {
    return (
        <Layout tituloHeader={"Posts"}>
            <PostsContainer />
        </Layout>
    );
};

export default Posts;
