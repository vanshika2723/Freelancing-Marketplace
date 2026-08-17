import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MessageCircle,
  Search,
  Send,
  ArrowLeft,
} from "lucide-react";

// ======================================================
// DEFAULT CONVERSATIONS
// ======================================================

const defaultConversations = [
  {
    id: 1,
    freelancerId: 1,
    name: "Rahul Sharma",
    role: "Client",
    avatar: "https://i.pravatar.cc/100?img=12",
    lastMessage: "Can you share the project update?",
    time: "10:30 AM",
    unreadCount: 0,

    messages: [
      {
        id: 1,
        sender: "other",
        text: "Hi Vanshika, how is the project going?",
        time: "10:25 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Hi Rahul! It's going well. I'm working on the dashboard.",
        time: "10:27 AM",
      },
      {
        id: 3,
        sender: "other",
        text: "Can you share the project update?",
        time: "10:30 AM",
      },
    ],
  },

  {
    id: 2,
    freelancerId: 2,
    name: "Priya Mehta",
    role: "Client",
    avatar: "https://i.pravatar.cc/100?img=47",
    lastMessage: "Thanks for your proposal!",
    time: "Yesterday",
    unreadCount: 0,

    messages: [
      {
        id: 1,
        sender: "other",
        text: "Thanks for your proposal!",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "You're welcome! I would love to work on this project.",
        time: "Yesterday",
      },
    ],
  },

  {
    id: 3,
    freelancerId: 3,
    name: "Amit Verma",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/100?img=33",
    lastMessage: "The files are ready.",
    time: "Mon",
    unreadCount: 0,

    messages: [
      {
        id: 1,
        sender: "other",
        text: "The files are ready.",
        time: "Mon",
      },
      {
        id: 2,
        sender: "me",
        text: "Great! I'll check them shortly.",
        time: "Mon",
      },
    ],
  },
];

// ======================================================
// COMPONENT
// ======================================================

function Messages() {
  const { freelancerId } = useParams();

  // ======================================================
  // CONVERSATIONS
  // ======================================================

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("freelanceMessages");

    if (!saved) {
      return defaultConversations;
    }

    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error(
        "Failed to load conversations:",
        error
      );

      return defaultConversations;
    }
  });

  // ======================================================
  // SELECTED CONVERSATION
  // ======================================================

  const [selectedId, setSelectedId] = useState(() => {
    if (freelancerId) {
      return Number(freelancerId);
    }

    return 1;
  });

  // ======================================================
  // OTHER STATES
  // ======================================================

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [mobileChat, setMobileChat] = useState(false);

  // ======================================================
  // SAVE CONVERSATIONS TO LOCAL STORAGE
  // ======================================================

  useEffect(() => {
    localStorage.setItem(
      "freelanceMessages",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  // ======================================================
  // OPEN CONVERSATION FROM URL
  // ======================================================

  useEffect(() => {
    if (!freelancerId) {
      setSelectedId(1);
      return;
    }

    const id = Number(freelancerId);

    const existingConversation =
      conversations.find(
        (conversation) =>
          conversation.freelancerId === id
      );

    if (existingConversation) {
      setSelectedId(existingConversation.id);
      setMobileChat(true);

      // Mark conversation as read
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === existingConversation.id
            ? {
                ...conversation,
                unreadCount: 0,
              }
            : conversation
        )
      );
    }
  }, [freelancerId]);

  // ======================================================
  // SELECTED CONVERSATION
  // ======================================================

  const selectedConversation =
    conversations.find(
      (conversation) =>
        conversation.id === selectedId
    );

  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const sendMessage = (e) => {
    e.preventDefault();

    if (
      !message.trim() ||
      !selectedConversation
    ) {
      return;
    }

    // Current time
    const currentTime =
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    // New message
    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: message.trim(),
      time: currentTime,
    };

    // ====================================================
    // CREATE NOTIFICATION
    // ====================================================

    const existingNotifications =
      JSON.parse(
        localStorage.getItem(
          "freelanceNotifications"
        )
      ) || [];

    const newNotification = {
      id: Date.now(),

      title: `Message sent to ${selectedConversation.name}`,

      message: newMessage.text,

      time: "Just now",

      read: false,
    };

    localStorage.setItem(
      "freelanceNotifications",

      JSON.stringify([
        newNotification,
        ...existingNotifications,
      ])
    );

    // ====================================================
    // UPDATE CONVERSATION
    // ====================================================

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,

              lastMessage:
                newMessage.text,

              time: newMessage.time,

              messages: [
                ...conversation.messages,
                newMessage,
              ],
            }
          : conversation
      )
    );

    // Clear input
    setMessage("");
  };

  // ======================================================
// SIMULATE INCOMING MESSAGE
// ======================================================

const receiveMessage = (conversationId, text) => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const incomingMessage = {
    id: Date.now(),
    sender: "other",
    text,
    time: currentTime,
  };

  setConversations((prev) =>
    prev.map((conversation) =>
      conversation.id === conversationId
        ? {
            ...conversation,
            lastMessage: text,
            time: currentTime,

            unreadCount:
              selectedId === conversationId
                ? 0
                : (conversation.unreadCount || 0) + 1,

            messages: [
              ...conversation.messages,
              incomingMessage,
            ],
          }
        : conversation
    )
  );

  // Create notification
  const existingNotifications =
    JSON.parse(
      localStorage.getItem("freelanceNotifications")
    ) || [];

  const conversation = conversations.find(
    (item) => item.id === conversationId
  );

  if (!conversation) return;

  const newNotification = {
    id: Date.now(),

    title: `New message from ${conversation.name}`,

    message: text,

    time: "Just now",

    read: false,
  };

  localStorage.setItem(
    "freelanceNotifications",

    JSON.stringify([
      newNotification,
      ...existingNotifications,
    ])
  );
};

  // ======================================================
  // SEARCH CONVERSATIONS
  // ======================================================

  const filteredConversations =
    conversations.filter((conversation) =>
      conversation.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // ======================================================
  // SELECT CONVERSATION
  // ======================================================

  const selectConversation = (
    conversation
  ) => {
    setSelectedId(conversation.id);

    setMobileChat(true);

    // Mark as read
    setConversations((prev) =>
      prev.map((item) =>
        item.id === conversation.id
          ? {
              ...item,
              unreadCount: 0,
            }
          : item
      )
    );
  };

  // ======================================================
  // BACK TO CONVERSATIONS
  // ======================================================

  const handleBack = () => {
    setMobileChat(false);
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 p-5 md:p-8">

      <div className="mx-auto w-full max-w-none">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="mb-6">

          <h1 className="text-2xl font-bold text-slate-900">
            Messages
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Connect and communicate with your clients
            and freelancers.
          </p>

        </div>

        {/* ==================================================
            MESSAGE CONTAINER
        ================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="grid h-[650px] lg:grid-cols-[320px_1fr]">

            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <aside
              className={`border-r border-slate-200 ${
                mobileChat
                  ? "hidden lg:block"
                  : "block"
              }`}
            >

              {/* ==================================================
                  SEARCH
              ================================================== */}

              <div className="border-b border-slate-100 p-4">

                <div className="relative">

                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search conversations..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  />

                </div>

              </div>

              {/* ==================================================
                  CONVERSATION LIST
              ================================================== */}

              <div className="h-[570px] overflow-y-auto">

                {filteredConversations.length ===
                0 ? (

                  <div className="flex h-full flex-col items-center justify-center px-5 text-center">

                    <MessageCircle
                      size={32}
                      className="text-slate-300"
                    />

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      No conversations found
                    </p>

                  </div>

                ) : (

                  filteredConversations.map(
                    (conversation) => (

                      <button
                        key={conversation.id}
                        type="button"
                        onClick={() =>
                          selectConversation(
                            conversation
                          )
                        }
                        className={`flex w-full gap-3 border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${
                          selectedId ===
                          conversation.id
                            ? "bg-indigo-50"
                            : ""
                        }`}
                      >

                        {/* Avatar */}

                        <img
                          src={
                            conversation.avatar
                          }
                          alt={
                            conversation.name
                          }
                          className="h-12 w-12 shrink-0 rounded-xl object-cover"
                        />

                        {/* Details */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-center justify-between gap-2">

                            <h3 className="truncate text-sm font-bold text-slate-900">
                              {
                                conversation.name
                              }
                            </h3>

                            <span className="shrink-0 text-[10px] text-slate-400">
                              {
                                conversation.time
                              }
                            </span>

                          </div>

                          <p className="mt-1 text-xs text-indigo-600">
                            {
                              conversation.role
                            }
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {
                              conversation.lastMessage
                            }
                          </p>

                          {/* Unread Badge */}

                          {conversation.unreadCount >
                            0 && (

                            <span className="mt-2 inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">

                              {conversation.unreadCount >
                              9
                                ? "9+"
                                : conversation.unreadCount}

                            </span>

                          )}

                        </div>

                      </button>

                    )
                  )

                )}

              </div>

            </aside>

            {/* ==================================================
                CHAT WINDOW
            ================================================== */}

            <section
              className={`flex min-w-0 flex-col ${
                mobileChat
                  ? "flex"
                  : "hidden lg:flex"
              }`}
            >

              {selectedConversation ? (

                <>

                  {/* ==================================================
                      CHAT HEADER
                  ================================================== */}

                  <div className="flex items-center gap-3 border-b border-slate-200 bg-white p-4">

                    {/* Mobile Back */}

                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 lg:hidden"
                    >
                      <ArrowLeft
                        size={18}
                      />
                    </button>

                    {/* Avatar */}

                    <img
                      src={
                        selectedConversation.avatar
                      }
                      alt={
                        selectedConversation.name
                      }
                      className="h-11 w-11 rounded-xl object-cover"
                    />

                    {/* Name */}

                    <div>

                      <h2 className="text-sm font-bold text-slate-900">
                        {
                          selectedConversation.name
                        }
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {
                          selectedConversation.role
                        }
                      </p>

                    </div>

                    {/* Online */}

                    <div className="ml-auto flex items-center gap-2">

                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                      <span className="hidden text-xs text-slate-500 sm:block">
                        Online
                      </span>

                    </div>

                  </div>

                  {/* ==================================================
                      CHAT MESSAGES
                  ================================================== */}

                  <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">

                    {/* Date */}

                    <div className="mb-5 text-center">

                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-slate-400 shadow-sm">
                        Today
                      </span>

                    </div>

                    {/* Messages */}

                    {selectedConversation.messages.map(
                      (item) => (

                        <div
                          key={item.id}
                          className={`flex ${
                            item.sender ===
                            "me"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >

                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 sm:max-w-[65%] ${
                              item.sender ===
                              "me"
                                ? "rounded-br-md bg-indigo-600 text-white"
                                : "rounded-bl-md bg-white text-slate-800 shadow-sm"
                            }`}
                          >

                            <p className="text-sm leading-6">
                              {
                                item.text
                              }
                            </p>

                            <p
                              className={`mt-1 text-[10px] ${
                                item.sender ===
                                "me"
                                  ? "text-indigo-100"
                                  : "text-slate-400"
                              }`}
                            >
                              {
                                item.time
                              }
                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                  {/* ==================================================
                      MESSAGE INPUT
                  ================================================== */}

                  <form
                    onSubmit={sendMessage}
                    className="border-t border-slate-200 bg-white p-4"
                  >

                    <div className="flex items-center gap-3">

                      <input
                        type="text"
                        value={message}
                        onChange={(e) =>
                          setMessage(
                            e.target.value
                          )
                        }
                        placeholder="Type your message..."
                        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                      />

                      <button
                        type="submit"
                        disabled={
                          !message.trim()
                        }
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Send size={18} />
                      </button>

                    </div>

                  </form>

                </>

              ) : (

                /* ==================================================
                    NO CONVERSATION
                ================================================== */

                <div className="flex h-full flex-col items-center justify-center">

                  <MessageCircle
                    size={45}
                    className="text-slate-300"
                  />

                  <h2 className="mt-4 font-bold text-slate-700">
                    Select a conversation
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Choose someone from the
                    conversation list.
                  </p>

                </div>

              )}

            </section>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Messages;