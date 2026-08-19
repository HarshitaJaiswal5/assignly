"use client";

import React, { useState } from "react";
import { X, Upload, FileText } from "lucide-react";

import type { UploadAssignmentFormData } from "@/types/uploadAssignments.types";

interface UploadAssignmentFormProps {
  onSubmit: (data: UploadAssignmentFormData) => void;
  onCancel: () => void;
}

export function UploadAssignmentForm({
  onSubmit,
  onCancel,
}: UploadAssignmentFormProps) {
  const [formData, setFormData] = useState<UploadAssignmentFormData>({
    title: "",
    category: "",
    description: "",
    amount: 0,
    dueDate: "",
    dueTime: "",
    location: "",
    instructions: "",
  });

  const [attachment, setAttachment] = useState<File | undefined>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setAttachment(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      attachment,
    });
  };

  return (
    <div className="rounded-xl border border-[#e3e3e3] bg-white p-5">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-[18px] font-semibold text-[#202020]">
            Upload assignment
          </h2>

          <p className="mt-1 text-[12px] text-[#777]">
            Add the details so someone can complete this assignment for you.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-1.5 text-[#777] transition hover:bg-[#f5f5f5]"
        >
          <X size={18} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
            Assignment title
          </label>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Complete CS301 project report"
            required
            className="h-10 w-full rounded-lg border border-[#dedede] px-3 text-[13px] outline-none focus:border-[#cc5942]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            required
            className="h-10 w-full rounded-lg border border-[#dedede] bg-white px-3 text-[13px] outline-none focus:border-[#cc5942]"
          >
            <option value="">Select category</option>
            <option value="Academic support">Academic support</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Research">Research</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what needs to be done..."
            rows={4}
            required
            className="w-full resize-none rounded-lg border border-[#dedede] px-3 py-2.5 text-[13px] outline-none focus:border-[#cc5942]"
          />
        </div>

        {/* Payment */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
            Payment
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#777]">
              ₹
            </span>

            <input
              name="amount"
              type="number"
              min="1"
              value={formData.amount || ""}
              onChange={handleChange}
              placeholder="450"
              required
              className="h-10 w-full rounded-lg border border-[#dedede] pl-7 pr-3 text-[13px] outline-none focus:border-[#cc5942]"
            />
          </div>
        </div>

        {/* Due date + time */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
              Due date
            </label>

            <input
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="h-10 w-full rounded-lg border border-[#dedede] px-3 text-[13px] outline-none focus:border-[#cc5942]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
              Due time
            </label>

            <input
              name="dueTime"
              type="time"
              value={formData.dueTime}
              onChange={handleChange}
              required
              className="h-10 w-full rounded-lg border border-[#dedede] px-3 text-[13px] outline-none focus:border-[#cc5942]"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
            Handoff location
          </label>

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. North Hall Print Desk"
            required
            className="h-10 w-full rounded-lg border border-[#dedede] px-3 text-[13px] outline-none focus:border-[#cc5942]"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
            Instructions
          </label>

          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Mention specific requirements..."
            rows={4}
            className="w-full resize-none rounded-lg border border-[#dedede] px-3 py-2.5 text-[13px] outline-none focus:border-[#cc5942]"
          />
        </div>

        {/* Attachment */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-[#333]">
            Attachment
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#d7d7d7] p-4 transition hover:border-[#cc5942]">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#f4eee9]">
              <FileText size={18} className="text-[#cc5942]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium text-[#333]">
                {attachment ? attachment.name : "Upload a file"}
              </p>

              <p className="mt-0.5 text-[11px] text-[#888]">
                PDF, DOC, DOCX, JPG or PNG
              </p>
            </div>

            <Upload size={17} className="text-[#777]" />

            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-[#eeeeee] pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#dedede] px-4 py-2.5 text-[12px] font-medium text-[#555] transition hover:bg-[#f7f7f7]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-[#cc5942] px-4 py-2.5 text-[12px] font-medium text-white transition hover:bg-[#b94d38]"
          >
            Post assignment
          </button>
        </div>
      </form>
    </div>
  );
}