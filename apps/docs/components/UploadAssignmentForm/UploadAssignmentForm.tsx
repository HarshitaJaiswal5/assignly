"use client";

import React, { useState } from "react";
import { X, Upload, FileText, MapPin } from "lucide-react";
import type { CreateAssignmentPayload } from "@/types/uploadAssignments.types";

export interface AssignmentFiles {
  descriptionPDF?: File;
  referencePDF?: File;
}

interface UploadAssignmentFormProps {
  /**
   * `data.descriptionPDF` / `data.referencePDF` are null here because the
   * payload expects string URLs. Upload the files from `files` in the parent,
   * then fill those two fields with the returned URLs before calling the API.
   */
  onSubmit: (data: CreateAssignmentPayload, files: AssignmentFiles) => void;
  onCancel: () => void;
}

const SUBJECT_OPTIONS = [
  "Academic support",
  "Programming",
  "Design",
  "Research",
  "Mathematics",
  "Other",
];

const inputCls =
  "h-10 w-full rounded-lg border border-[#dedede] px-3 text-[13px] outline-none focus:border-[#cc5942]";
const textareaCls =
  "w-full resize-none rounded-lg border border-[#dedede] px-3 py-2.5 text-[13px] outline-none focus:border-[#cc5942]";
const labelCls = "mb-1.5 block text-[12px] font-medium text-[#333]";

export function UploadAssignmentForm({
  onSubmit,
  onCancel,
}: UploadAssignmentFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [subject, setSubject] = useState<string[]>([]);
  const [amount, setAmount] = useState("");

  // deliveryDate is a single string in the payload, so date + time are
  // collected separately and combined on submit.
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locating, setLocating] = useState(false);

  const [stationaryInput, setStationaryInput] = useState("");
  const [stationary, setStationary] = useState<string[]>([]);
  const [stationaryAmount, setStationaryAmount] = useState("");

  const [files, setFiles] = useState<AssignmentFiles>({});
  const [error, setError] = useState("");

  const toggleSubject = (s: string) =>
    setSubject((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const addStationary = () => {
    const value = stationaryInput.trim();
    if (value && !stationary.includes(value)) {
      setStationary((prev) => [...prev, value]);
    }
    setStationaryInput("");
  };

  const handleFile =
    (key: keyof AssignmentFiles) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) setFiles((prev) => ({ ...prev, [key]: file }));
    };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
        setLocating(false);
        setError("");
      },
      () => {
        setLocating(false);
        setError("Couldn't get your location. Enter coordinates manually.");
      }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (subject.length === 0) {
      setError("Select at least one subject.");
      return;
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    if (
      latitude === "" ||
      longitude === "" ||
      Number.isNaN(lat) ||
      Number.isNaN(lng)
    ) {
      setError("Enter valid delivery latitude and longitude.");
      return;
    }

    const deliveryDate = new Date(`${date}T${time}`);
    if (Number.isNaN(deliveryDate.getTime())) {
      setError("Enter a valid delivery date and time.");
      return;
    }

    const payload: CreateAssignmentPayload = {
      title: title.trim(),
      description: description.trim(),
      descriptionPDF: null,
      referencePDF: null,
      instructions: instructions.trim() || null,
      subject,
      amount: Number(amount),
      deliveryDate: deliveryDate.toISOString(),
      deliveryAddress: deliveryAddress.trim(),
      deliveryLatitude: lat,
      deliveryLongitude: lng,
      additionalStationary: stationary,
      additionalStationaryAmount: stationary.length
        ? Number(stationaryAmount) || 0
        : 0,
    };

    onSubmit(payload, files);
  };

  const FileField = ({
    label,
    fileKey,
  }: {
    label: string;
    fileKey: keyof AssignmentFiles;
  }) => (
    <div>
      <span className={labelCls}>{label}</span>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#d7d7d7] p-4 transition hover:border-[#cc5942]">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#f4eee9]">
          <FileText size={18} className="text-[#cc5942]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-medium text-[#333]">
            {files[fileKey] ? files[fileKey]!.name : "Upload a PDF"}
          </p>
          <p className="mt-0.5 text-[11px] text-[#888]">PDF only</p>
        </div>
        <Upload size={17} className="text-[#777]" />
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFile(fileKey)}
          className="hidden"
        />
      </label>
    </div>
  );

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

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className={labelCls}>Assignment title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Complete CS301 project report"
            required
            className={inputCls}
          />
        </div>

        {/* Subject (string[]) */}
        <div>
          <span className={labelCls}>Subject</span>
          <div className="flex flex-wrap gap-2">
            {SUBJECT_OPTIONS.map((s) => {
              const active = subject.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSubject(s)}
                  className={`rounded-full border px-3 py-1.5 text-[12px] transition ${
                    active
                      ? "border-[#cc5942] bg-[#cc5942] text-white"
                      : "border-[#dedede] text-[#555] hover:border-[#cc5942]"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what needs to be done..."
            rows={4}
            required
            className={textareaCls}
          />
        </div>

        {/* Instructions (optional) */}
        <div>
          <label className={labelCls}>Instructions (optional)</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Mention specific requirements..."
            rows={3}
            className={textareaCls}
          />
        </div>

        {/* PDFs */}
        <FileField label="Description PDF (optional)" fileKey="descriptionPDF" />
        <FileField label="Reference PDF (optional)" fileKey="referencePDF" />

        {/* Payment */}
        <div>
          <label className={labelCls}>Payment</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#777]">
              ₹
            </span>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="450"
              required
              className={`${inputCls} pl-7`}
            />
          </div>
        </div>

        {/* Delivery date + time */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Delivery date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Delivery time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className={inputCls}
            />
          </div>
        </div>

        {/* Delivery address + coordinates */}
        <div>
          <label className={labelCls}>Delivery address</label>
          <input
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="e.g. North Hall Print Desk"
            required
            className={inputCls}
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#333]">
              Delivery coordinates
            </span>
            <button
              type="button"
              onClick={useCurrentLocation}
              disabled={locating}
              className="flex items-center gap-1 text-[11px] font-medium text-[#cc5942] disabled:opacity-50"
            >
              <MapPin size={13} />
              {locating ? "Locating..." : "Use current location"}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="number"
              step="any"
              min="-90"
              max="90"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Latitude"
              required
              className={inputCls}
            />
            <input
              type="number"
              step="any"
              min="-180"
              max="180"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Longitude"
              required
              className={inputCls}
            />
          </div>
        </div>

        {/* Additional stationery */}
        <div>
          <label className={labelCls}>Additional stationery (optional)</label>
          <div className="flex gap-2">
            <input
              value={stationaryInput}
              onChange={(e) => setStationaryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addStationary();
                }
              }}
              placeholder="e.g. A4 sheets, blue pen"
              className={inputCls}
            />
            <button
              type="button"
              onClick={addStationary}
              className="rounded-lg border border-[#dedede] px-4 text-[12px] font-medium text-[#555] transition hover:bg-[#f7f7f7]"
            >
              Add
            </button>
          </div>

          {stationary.length > 0 && (
            <>
              <div className="mt-2 flex flex-wrap gap-2">
                {stationary.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1 rounded-full bg-[#f4eee9] px-3 py-1 text-[12px] text-[#333]"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() =>
                        setStationary((prev) => prev.filter((x) => x !== item))
                      }
                      className="text-[#777] hover:text-[#cc5942]"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="relative mt-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#777]">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  value={stationaryAmount}
                  onChange={(e) => setStationaryAmount(e.target.value)}
                  placeholder="Stationery amount"
                  className={`${inputCls} pl-7`}
                />
              </div>
            </>
          )}
        </div>

        {error && <p className="text-[12px] text-red-600">{error}</p>}

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