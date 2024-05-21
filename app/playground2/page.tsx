'use server'

import { getUserProfile, getFollowers, getFollowings, searchUser, followUser, createProfile, updateProfile } from "@/actions/user";
import { reactToPost } from "@/actions/react";
import { createPost, deletePost, getMyPosts, getAllPosts } from "@/actions/post";

export default async function Playground2() {
    
    const user_id = "92a75107-0564-4dae-8be0-29665aaccf2b";
    const another_user = "fafa45d2-9920-4d80-ad35-af748fed4b68";
    let habit_id = "d2fc6853-b04f-4267-8eee-8a4f7320df42"
    let new_user_id = "8df5e5ad-2df2-47a1-876e-a7741b9ba350";
    const content = "hahaha";
    let avatar_url = "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/avatar/t013a1780aedcfea383.jpeg"
    const username_substr = "ub";
    const post_id = "630b7c33-8758-44f7-8b9a-021a4601a7e3";
    let reaction_type = "meow";
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

    //     const newProfile = await createProfile(new_user_id);
    //     console.log("New profile", newProfile);

    //     const updatedProfile = await updateProfile(new_user_id, "大海怪");
    //     console.log("updated profile", updatedProfile);
    // } catch (error) {
    //     console.error("Error during backend function calls", error);
    // }

    //test posts
    // try {
    //     const newPosts = await createPost(user_id, habit_id, content);
    //     console.log("new posts", newPosts);

    //     const deletePosts = await deletePost(post_id);
    //     console.log("delete post", deletePosts);

    //     const myPosts = await getMyPosts(new_user_id);
    //     console.log("me post", myPosts);

    //     const allPosts = await getAllPosts();
    //     console.log("all posts", allPosts);

    // } catch (error) {
    //     console.error("Error during backend function calls", error);
    // }


    //test react
    // try {
    //     const reaction = await reactToPost(new_user_id, post_id, reaction_type);
    //     console.log("new reaction", reaction);

    // } catch (error) {
    //     console.error("Error during backend function calls", error);
    // }

    return (
        <div>
            <h1>Playground2</h1>
            <p>Check console for output</p>
        </div>
    );
}
