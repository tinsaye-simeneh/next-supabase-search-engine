import { Button, Container, Text, Input } from "@mantine/core";
import supabase from "../utilities/supabaseClient";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Demo() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("customerData")
      .select("name")
      .ilike("name", `%${search}%`);
    if (error) {
      console.log(error);
    } else {
      setData(data);
    }
  };

  if (search === "") {
    data.length = 0;
  }
  if (search.length > 0) {
    handleSearch();
  }

  return (
    <Container size="xs">
      <Text size="lg" align="center" style={{ marginBottom: 15 }}>
        Search for a post
      </Text>
      <Input
        placeholder="Search"
        icon={<IconSearch />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        onKeyDown={(e) => e.key === "Escape" && setSearch("")}
        style={{ marginBottom: 15 }}
      />
      setSearch is: {<pre>{JSON.stringify(search, null, 2)}</pre>}
      <br />
      data:{" "}
      {
        <pre>
          {JSON.stringify(
            data.map((item) => item.name),
            null,
            2
          )}
        </pre>
      }
      <br />
    </Container>
  );
}
