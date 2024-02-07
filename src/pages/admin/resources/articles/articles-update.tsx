import React from "react";
import BreadCrumb from "@components/ui/custom/breadcrumb/breadcrumb";
import AdminOutletContainer from "@components/admin/layout/container/AdminOutletContainer";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import RichTextEditor from "@components/ui/custom/rich-text-editor/RichTextEditor";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import useGetTagByKeyWord from "@hooks/api/get/useGetTagByKeyword";
import UserTagInputDropdown from "@components/user/account/input/UserTagInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@components/ui/alert-dialog";
import CoverImageUpload from "@components/ui/custom/image/cover-image-input";
import ProfileImageUpload from "@components/ui/custom/image/profile-image-input";
import { FaRegTrashAlt } from "react-icons/fa";
import { Textarea } from "@components/ui/textarea";
import { useParams } from "react-router-dom";

const UpdateArticles = () => {
  const { articlesId } = useParams();
  const [searchInputTagValue, setSearchInputTagValue] = useState<string>("");
  const [imagesCount, setImageCount] = useState(1);
  const [creditsCount, setCreditCount] = useState(1);
  const { data: tagResult } = useGetTagByKeyWord(searchInputTagValue);

  const breadcrumbItems = [
    { title: "Resource Management", link: "/admin/resources" },
    { title: "Articles", link: "/admin/resource/articles" },
    {
      title: `Update Article # ${articlesId} `,
      link: `/admin/resource/articles/view/${articlesId}`
    }
  ];

  const handleAddImage = (e: any) => {
    e.preventDefault();
    setImageCount(prevCount => prevCount + 1);
  };

  const handleDeleteImage = (index: number, e: any) => {
    e.preventDefault();
    setImageCount(prevCount => prevCount - 1);
  };

  const handleAddCredit = (e: any) => {
    e.preventDefault();
    setCreditCount(prevCount => prevCount + 1); // Increment speaker count
  };

  const handleDeleteCredit = (index: number, e: any) => {
    e.preventDefault();
    setCreditCount(prevCount => prevCount - 1);
  };

  return (
    <AdminOutletContainer>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Article# {articlesId}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Articles that has been published is visible to public, articles draft is
        articles that is currently in progress, and articles archive is the
        articles removed from the website.
      </p>
      <hr className="my-4" />
      <div className="max-w-[60rem] mx-auto">
        <form>
          <div className="flex flex-wrap justify-between gap-4 mb-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" placeholder="Input article title" />
            </div>
          </div>

          {/* input content */}
          <div>
            <Label>Content</Label>
            <RichTextEditor height={300} />
          </div>

          {/* tags */}
          <div className="mt-4">
            <h3 className="text-foreground text-md font-poppins-bold">
              Add Tags
            </h3>

            <Label>
              Add up to 5 tags to describe what your blog is about. Start typing
              to see suggestions.
            </Label>

            <div className="">
              <UserTagInputDropdown
                option={tagResult}
                onChange={e => {
                  setSearchInputTagValue(e.target.value);
                }}
              />
            </div>
          </div>

          {/* thumbnail */}
          <div className="mt-4">
            <Label>Article Thumbnail</Label>
            <div className="mx-auto">
              <CoverImageUpload />
            </div>
          </div>

          {/* add image */}
          <div className="flex justify-between items-center my-4">
            <h2 className="text-xl font-bold tracking-tight">Images</h2>
            <Button ref={null} variant="outline" onClick={handleAddImage}>
              + Add Image
            </Button>
          </div>

          {/* images form*/}
          {Array.from({ length: imagesCount }).map((_, index) => (
            <>
              <div
                className="flex flex-wrap justify-between items-end gap-4 mb-4"
                key={index}
              >
                {/* add image */}
                <div className="grid items-center gap-1.5">
                  <ProfileImageUpload />
                </div>

                {/* image title */}
                <div className="grid w-full max-w-[23rem] items-center gap-1.5">
                  <Label htmlFor={`image-title-${index}`}>Title</Label>
                  <Input
                    type="text"
                    id={`image-title-${index}`}
                    placeholder="e.g. The Artic Monkey."
                  />
                </div>

                {/* photo taken by */}
                <div className="grid w-full max-w-[23rem] items-center gap-1.5">
                  <Label htmlFor="text">Photograper</Label>
                  <Input
                    type="text"
                    id={`name-${index}`}
                    placeholder="e.g. Joven Photograpy"
                  />
                </div>
                <Button
                  variant="destructive"
                  onClick={e => handleDeleteImage(index, e)}
                >
                  <FaRegTrashAlt />
                </Button>
              </div>
              <div className="mb-4">
                <Label>Description</Label>
                <Textarea />
              </div>
            </>
          ))}

          {/* credits */}
          <div className="flex justify-between items-center my-4">
            <h2 className="text-xl font-bold tracking-tight">Credits</h2>
            <Button ref={null} variant="outline" onClick={handleAddCredit}>
              + Add Credit
            </Button>
          </div>
          {Array.from({ length: creditsCount }).map((_, index) => (
            <>
              <div
                className="flex flex-wrap justify-between items-end gap-4 mb-4"
                key={index}
              >
                <div className="grid w-full max-w-[30rem] items-center gap-1.5">
                  <Label htmlFor={`name-${index}`}>Name</Label>
                  <Input
                    type="text"
                    id={`name-${index}`}
                    placeholder="e.g. Ms. Justine Angela Marielle  D. Sanchez"
                  />
                </div>

                <div className="grid w-full max-w-[23rem] items-center gap-1.5">
                  <Label htmlFor="text">Title</Label>
                  <Input
                    type="text"
                    id={`name-${index}`}
                    placeholder="e.g. Administrative Support Staff"
                  />
                </div>
                <Button
                  variant="destructive"
                  onClick={e => handleDeleteCredit(index, e)}
                >
                  <FaRegTrashAlt />
                </Button>
              </div>
            </>
          ))}

          {/* ============================= buttons ============================ */}
          <div className="flex gap-4 justify-end mt-4">
            <Link to="/admin/resource/articles">
              <Button variant="ghost">Back</Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="hover:border-red-500">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete article?</AlertDialogTitle>
                  <AlertDialogDescription>
                    When you delete articles it will go to archive and you can
                    recover it from there.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Link to="/admin/resource/articles">
                    <AlertDialogAction className="bg-red-600 hover:bg-red-500 hover:text-black">
                      Delete
                    </AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Link to="/admin/resource/articles-draft">
              <Button variant="outline" className="hover:border-green-500">
                Update Draft
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Publish Article</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to publish this article?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This article can be seen publicly by the users when
                    published, make sure to review everything before publish.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Link to="/admin/resource/articles">
                    <AlertDialogAction>Publish</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </div>
    </AdminOutletContainer>
  );
};

export default UpdateArticles;
