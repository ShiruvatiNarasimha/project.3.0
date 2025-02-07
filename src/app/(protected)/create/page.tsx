"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Form type definition
type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
    createProject.mutate(
      {
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          reset();
          refetch();
        },
        onError: () => {
          toast.error("Failed to create project");
        },
      },
    );
    return true;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <img
            src="/undraw_github.svg"
            alt="Logo"
            className="mx-auto mb-4 h-16 w-16"
          />
          <h1 className="text-3xl font-bold text-gray-900">
            Link GitHub Repository
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter the repository URL to connect it to GitHub.AI
          </p>
        </div>
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              required
              className="rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="GitHub URL"
              type="url"
              required
              className="rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <Input
              {...register("githubToken")}
              placeholder="GitHub Token (Optional)"
              className="rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <Button
              type="submit"
              disabled={createProject.isPending}
              className="w-full rounded-lg bg-indigo-600 py-3 text-white transition duration-200 hover:bg-indigo-700 disabled:opacity-50"
            >
              Create Project
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreatePage;
