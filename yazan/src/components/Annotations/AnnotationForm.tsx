import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
} from "@mui/material";

export function AnnotationForm({
  onAdd,
}: {
  onAdd: (text: string) => void;
}) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
    >
      <TextField
        size="small"
        placeholder="Add annotation…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
      />

      <Button
        variant="contained"
        onClick={submit}
        disabled={!text.trim()}
      >
        Add
      </Button>
    </Stack>
  );
}
