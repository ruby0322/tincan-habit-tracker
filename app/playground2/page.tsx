'use server'

import { getUserProfile, getFollowers, getFollowings, searchUser, followUser } from "@/actions/user";
import { createPost, deletePost, getMyPosts, getAllPosts } from "@/actions/posts";

export default async function Playground2() {
    
    const user_id = "92a75107-0564-4dae-8be0-29665aaccf2b";
    const another_user = "fafa45d2-9920-4d80-ad35-af748fed4b68";
    let habit_id = "3a16e62a-3d74-44f5-a06b-b86699763ea5"
    const content = "haha";
    const username_substr = "ub";
    const post_id = "";
    // test users
    // try {
    //     const userProfile = await getUserProfile(user_id);
    //     console.log("Find My Profile", userProfile);

    //     const followers = await getFollowers(user_id);
    //     console.log("Followers", followers);

    //     const followings = await getFollowings(user_id);
    //     console.log("Followings", followings);

    //     const searchResults = await searchUser(username_substr);
    //     console.log("Search Results", searchResults);

    //     const followResult = await followUser(another_user, user_id);
    //     console.log("Follow Result", followResult);
    // } catch (error) {
    //     console.error("Error during backend function calls", error);
    // }

    // test posts
    try {
        // const newPosts = await createPost(user_id, habit_id, content, post_id);
        // console.log("new posts", newPosts);

        // const deletePosts = await deletePost(post_id);
        // console.log("delete post", deletePosts);

        // const myPosts = await getMyPosts(user_id);
        // console.log("me post", myPosts);

        // const allPosts = await getAllPosts(user_id);
        // console.log("all posts", allPosts);

    } catch (error) {
        console.error("Error during backend function calls", error);
    }

    return (
        <div>
            <h1>Playground2</h1>
            <p>Check console for output</p>
        </div>
    );
}
