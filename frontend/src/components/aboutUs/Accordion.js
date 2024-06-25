import React, { useState } from "react";

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b">
    <button
      className="w-full text-left px-4 py-2 flex justify-between items-center focus:outline-none"
      onClick={onClick}
    >
      <span className="text-blue-800 font-bold">{title}</span>
      <span>{isOpen ? "-" : "+"}</span>
    </button>
    {isOpen && (
      <div className="px-4 py-2 text-left" style={{ textIndent: "1rem" }}>
        {content}
      </div>
    )}
  </div>
);

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === openIndex}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
