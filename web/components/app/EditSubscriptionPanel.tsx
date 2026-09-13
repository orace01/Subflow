"use client";

import { useState } from "react";
import { AddSubscriptionForm, type EditableSubscriptionValues } from "./AddSubscriptionForm";

export function EditSubscriptionPanel({
  subscriptionId,
  initialValues,
}: {
  subscriptionId: string;
  initialValues: EditableSubscriptionValues;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-[12.5px] font-bold text-text-faint hover:text-ink cursor-pointer"
      >
        Modifier
      </button>
    );
  }

  return (
    <div className="w-full">
      <AddSubscriptionForm
        compact
        subscriptionId={subscriptionId}
        initialValues={initialValues}
        onSuccess={() => setEditing(false)}
      />
      <button
        onClick={() => setEditing(false)}
        className="text-[12.5px] font-bold text-text-faint hover:text-ink cursor-pointer mt-3"
      >
        Annuler
      </button>
    </div>
  );
}
