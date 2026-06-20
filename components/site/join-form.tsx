"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { joinPageContent, mandateRegions } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

export function JoinForm({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card>
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <Input placeholder={joinPageContent.fields.firstName[locale]} required />
        <Input placeholder={joinPageContent.fields.lastName[locale]} required />
        <Input placeholder={joinPageContent.fields.country[locale]} required />
        <Input placeholder={joinPageContent.fields.city[locale]} required />
        <Input type="email" placeholder={joinPageContent.fields.email[locale]} required />
        <Input placeholder={joinPageContent.fields.phone[locale]} required />
        <Input placeholder={joinPageContent.fields.messenger[locale]} />
        <Select defaultValue="">
          <option value="" disabled>
            {joinPageContent.fields.applicationType[locale]}
          </option>
          {joinPageContent.applicationTypes.map((item) => (
            <option key={item.ru}>{item[locale]}</option>
          ))}
        </Select>
        <Select defaultValue="">
          <option value="" disabled>
            {joinPageContent.fields.block[locale]}
          </option>
          {mandateRegions.map((region) => (
            <option key={region.id}>{region.title[locale]}</option>
          ))}
        </Select>
        <Input placeholder={joinPageContent.fields.organization[locale]} />
        <div className="md:col-span-2">
          <Textarea placeholder={joinPageContent.fields.experience[locale]} />
        </div>
        <div className="md:col-span-2">
          <Textarea placeholder={joinPageContent.fields.message[locale]} required />
        </div>
        <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" className="sm:min-w-52">
            {joinPageContent.submitLabel[locale]}
          </Button>
          {submitted ? (
            <p className="max-w-2xl text-sm text-[var(--color-green)]">
              {joinPageContent.success[locale]}
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
