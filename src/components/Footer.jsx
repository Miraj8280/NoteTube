import { Heading } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Heading mt={4} size="sm">
      Made with <span className="text-red-500">❤</span> by{" "}
      <a
        href="https://www.linkedin.com/in/miraj-asraf/"
        target="_blank"
        className="text-green-700 hover:text-green-500 hover:border-green-500 hover:border-b-2"
      >
        Miraj Asraf
      </a>
    </Heading>
  );
}
