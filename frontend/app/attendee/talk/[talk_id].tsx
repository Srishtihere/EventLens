import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

export default function AttendeeTalkView() {
  const { talk_id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('beginner');

  // Track the view count on mount
  useEffect(() => {
    // In future: POST /api/talks/${talk_id}/view/
  }, [talk_id]);

  const talk = {
    title: "Mastering React Context",
    speaker: "Jane Doe",
    transcript: "Welcome everyone. Today we will talk about React Context... (full transcript here)",
    learning_modes: {
      beginner: "React is a library for building UI. (Simple analogy: it's like Lego blocks). Basic Task: Create a Hello World component.",
      intermediate: "Best practice: Use Context API for global state but avoid it for high-frequency updates. Common mistake: Prop drilling. Code pattern: Custom hooks.",
      advanced: "Trade-off: Context vs Redux. Scaling concern: Context causes full re-renders. System design: Implement a custom reconciler."
    },
    projects: [
      "Build a mini React performance dashboard",
      "Implement a caching system using this concept"
    ],
    prerequisites: ["Basic JavaScript", "React Fundamentals"],
    interview_questions: ["How does React handle state updates?", "Explain the Virtual DOM."]
  };

  const tabs = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  return (
    <ScrollView className="flex-1 bg-black p-6">
      <View className="mb-8 mt-10 border-b border-zinc-800 pb-6">
        <Text className="text-4xl font-black text-white tracking-tighter mb-2">{talk.title}</Text>
        <Text className="text-zinc-500 font-medium tracking-widest uppercase">{talk.speaker}</Text>
      </View>

      {/* Prerequisites & Interview Questions */}
      <View className="flex-row justify-between mb-8">
        <View className="flex-1 bg-zinc-950 p-4 border border-zinc-800 mr-2">
          <Text className="text-white font-bold uppercase tracking-wider text-xs mb-3">Prerequisites</Text>
          {talk.prerequisites.map((p, i) => (
            <Text key={i} className="text-zinc-400 mb-1">• {p}</Text>
          ))}
        </View>
        <View className="flex-1 bg-zinc-950 p-4 border border-zinc-800 ml-2">
          <Text className="text-white font-bold uppercase tracking-wider text-xs mb-3">Interview Prep</Text>
          {talk.interview_questions.map((q, i) => (
            <Text key={i} className="text-zinc-400 mb-1">• {q}</Text>
          ))}
        </View>
      </View>

      {/* Learning Modes Tabs */}
      <View className="bg-zinc-950 flex-row mb-6 border border-zinc-800">
        {tabs.map(tab => (
          <TouchableOpacity 
            key={tab.id}
            className={`flex-1 py-4 items-center border-b-2 ${activeTab === tab.id ? 'border-white bg-zinc-900' : 'border-transparent bg-transparent'}`}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text className={`font-bold uppercase tracking-wider text-xs ${activeTab === tab.id ? 'text-white' : 'text-zinc-500'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* AI Smart Notes / Learning Content */}
      <View className="bg-zinc-950 p-6 mb-6 border border-zinc-800">
        <Text className="text-white font-black uppercase tracking-wider mb-4">Core Concepts</Text>
        <Text className="text-zinc-300 leading-7 text-base">
          {talk.learning_modes[activeTab as keyof typeof talk.learning_modes]}
        </Text>
      </View>

      {/* Projects Generator Output */}
      <View className="bg-zinc-950 p-6 mb-6 border border-zinc-800">
        <Text className="text-white font-black uppercase tracking-wider mb-4">What you can build now</Text>
        {talk.projects.map((project, idx) => (
          <View key={idx} className="flex-row items-start mb-4">
            <View className="bg-white w-6 h-6 items-center justify-center mr-4 mt-0.5">
              <Text className="text-black text-xs font-black">{idx + 1}</Text>
            </View>
            <Text className="text-zinc-300 flex-1 leading-6">{project}</Text>
          </View>
        ))}
      </View>

      {/* Raw Transcript Collapsible */}
      <View className="bg-zinc-950 p-6 mb-10 border border-zinc-800">
        <Text className="text-white font-black uppercase tracking-wider mb-4">Transcript</Text>
        <Text className="text-zinc-600 leading-6">{talk.transcript}</Text>
      </View>
    </ScrollView>
  );
}
