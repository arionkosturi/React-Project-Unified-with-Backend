// @ts-nocheck
import React, { useState, Component } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import CustomEditor from './CustomEditor';
import { useToast } from './ui/use-toast';
import { Toaster } from './ui/toaster';

function ArticleForm() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [contentValue, setContentValue] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [sourceUrl, setSource] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    let handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3344/news/', {
                title,
                description,
                imgUrl,
                content: contentValue,
                author,
                category,
                sourceUrl,
                isPublished,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        toast({
            variant: 'success',
            title: 'Success',
            description: 'Artikulli u krijua me sukses!',
        });
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };
    return (
        <div className="flex flex-col container gap-2 mx-auto">
            <Toaster />
            <Header />
            <h1 className="text-3xl text-center text-green-600">
                Creating New Article
            </h1>

            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                placeholder="Enter Title"
                name="title"
                className="border p-2"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <label htmlFor="description">Description</label>
            <textarea
                type="text"
                id="description"
                placeholder="Enter Description"
                name="description"
                className="border p-2"
                // @ts-ignore
                rows="4"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />

            <label htmlFor="content">Content:</label>
            <CustomEditor
                contentValue={contentValue}
                setContentValue={setContentValue}
            />

            {/* <textarea
                type="text"
                id="content"
                placeholder="Enter Content"
                name="content"
                className="border p-2"
                // @ts-ignore
                rows="10"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            /> */}
            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                placeholder="Enter Author"
                name="author"
                className="border p-2"
                value={author}
                onChange={(e) => {
                    setAuthor(e.target.value);
                }}
            />
            <label htmlFor="source">Source:</label>
            <textarea
                // @ts-ignore
                type="text"
                id="source"
                placeholder="Enter Source"
                name="source"
                className="border p-2"
                value={sourceUrl}
                onChange={(e) => {
                    setSource(e.target.value);
                }}
            />
            <label htmlFor="category">Category:</label>
            <input
                type="text"
                id="category"
                placeholder="Enter Category"
                name="category"
                className="border p-2"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            />
            <label htmlFor="imgUrl">Image URL</label>
            <textarea
                // @ts-ignore
                type="text"
                id="imgUrl"
                placeholder="Enter Img Source"
                name="imgUrl"
                className="border"
                value={imgUrl}
                onChange={(e) => {
                    setImgUrl(e.target.value);
                }}
            />
            <div className="flex border border-red-300">
                <span className="p-6">Image Preview:</span>
                <img className="w-1/3 my-6" src={imgUrl} />
            </div>

            <input
                type="text"
                id="isPublished"
                name="isPublished"
                className="border p-2"
                value={isPublished}
                onChange={(e) => {
                    setIsPublished(e.target.value);
                }}
            />
            <div className="mx-auto container">
                <form>
                    <Link to="/">
                        <button className="mx-4 border shadow w-1/5">
                            Cancel
                        </button>
                    </Link>
                    <button className="mx-4 border bg-red-600 text-white shadow w-1/5">
                        Delete
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="mx-4 border shadow bg-green-600 text-white w-1/5"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ArticleForm;
