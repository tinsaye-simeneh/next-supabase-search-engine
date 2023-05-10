import { Button, Container, Group, Input } from "@mantine/core";
import supabase from "../utilities/supabaseClient";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

const search = (query: string) => {
  return supabase
    .from("pages")
    .select("*")
    .filter("title", "ilike", `%${query}%`)
    .order("title", { ascending: true });
};

const handleSearch = () => {
  const router = useRouter();
  <Input
    icon={<IconSearch />}
    placeholder="Search"
    onChange={(event) => {
      const query = event.currentTarget.value;
      search(query).then((response) => {
        const results = response.data;
        if (results.length > 0) {
          <Group position="center">
            {results.map((result) => (
              <Button
                key={result.id}
                onClick={() => {
                  router.push(`/pages/${result.id}`);
                }}
              >
                {result.title}
              </Button>
            ))}
          </Group>;
        } else {
          <Group position="center">
            <Button>No results</Button>
          </Group>;
        }
      });
    }}
  />;
};

export default function Demo() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container size="xs">
      <Input icon={<IconSearch />} placeholder="Search" />
      <Button onClick={handleSearch} mt="lg">
        search
      </Button>
    </Container>
  );
}
