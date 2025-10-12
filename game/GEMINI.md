# Gemini Assistant Guidelines for the MAVERICK Project

    This document provides guidance for the Gemini AI assistant to effectively contribute to the MAVERICK project. this is a windows machine.

## Core Mandates

- **Project Goal:** The primary objective of the MAVERICK project is to develop a sophisticated, automated red-teaming pipeline for Large Language Models (LLMs). This involves creating a system that can autonomously discover and execute novel "jailbreaking" techniques against LLMs to identify and analyze their vulnerabilities.
- **Architectural Principles:** The project follows a modular, asynchronous, and event-driven architecture. Key components like the `EvolutionEngine`, `JudgeAgent`, and `OllamaClient` are designed to be decoupled and interact through well-defined interfaces. All new code should adhere to these principles.
- **Development Philosophy:** The project emphasizes a research-oriented and experimental approach. We encourage the exploration of new ideas and techniques, but all contributions must be well-documented, tested, and integrated into the existing framework.

### Codebase Ground Truth

- **Current Implementation vs. Documentation:** Be aware that some `.md` files (e.g., `ALGORITHM_EVALUATION_REPORT.md`) may describe *intended* or *future* algorithmic implementations. The `.py` source code files represent the *current, ground truth* implementation, which may be more minimal or simplified during development phases.
- **Detailed Code Reference:** For in-depth technical explanations of classes, functions, algorithms, and identified areas for improvement within the current codebase, refer to `PROGRAMMER.md`. This file provides granular details not present in high-level architectural documents.

## Primary Workflows

### Feature Development
- **Understand the Core Logic:** Before implementing new features, it is crucial to understand the existing codebase, particularly the interaction between the genetic algorithm (`genetic/`), the evaluation agents (`agents/`), and the LLM clients (`clients/`).
- **Follow Existing Patterns:** New code should mimic the style and structure of existing modules. For example, new genetic operators should be implemented in `genetic/mutation_strategies.py` and integrated into the `EvolutionEngine`.
- **Leverage Existing Libraries:** Before implementing new functionality from scratch, search for and evaluate existing libraries that can be integrated into the project. Ensure any new dependency is compatible with the versions specified in `pyproject.toml`. If a suitable library cannot be found, then proceed with a custom implementation.
- **Asynchronous Operations:** The project heavily relies on Python's `asyncio` library for concurrent operations. All I/O-bound tasks, especially interactions with LLMs, must be implemented as asynchronous functions.
- **Modularity and avoid harcoding:** Code should be modular. Harcoded values should go to /config in an appropriate .py file in an appropriate class.
- **Minimal implementations:** If a minimal implementation or placeholder is chosen, this should be made clear with a comment in the code. Also, this should be registered in the file TODO.md explaining the location of this code and the feature that should be improved later on. All necessary details for the incorporation of the new improved feature to the current code (how to maintain compatibility) should be provided. No need to explain how to improve the code.


### Bug Fixes
- **Reproduce the Issue:** Before attempting to fix a bug, create a test case that reliably reproduces the issue. This will help verify the effectiveness of the fix.
- **Analyze the Logs:** The project uses a centralized logging system. Use the logs in the `logs/` directory to trace the execution flow and identify the root cause of the bug.
- **Consider the Impact:** When fixing a bug, consider the potential impact on other parts of the system. Ensure that the fix does not introduce new issues or regressions.

### Code Refactoring
- **Improve Clarity and Simplicity:** The primary goal of refactoring should be to improve the clarity, simplicity, and maintainability of the code.
- **Maintain API Compatibility:** When refactoring existing code, ensure that the public APIs of the refactored components remain unchanged to avoid breaking other parts of the system.
- **Run Tests:** After refactoring, run all existing tests to ensure that the changes have not introduced any regressions.

## Operational Guidelines

### File Interaction
- **Focus on Code:** Prioritize reading and analyzing Python source code files (`.py`). Avoid reading data-centric files such as configuration (`.yaml`), logs (`.log`), or experiment results (`.json`), unless specifically instructed. Your primary role is that of a software developer, so focus your attention on the application's logic and structure.

### Code Style and Formatting
- **PEP 8:** All Python code must adhere to the PEP 8 style guide.
- **Docstrings:** All modules, classes, and functions must have clear and concise docstrings that explain their purpose, arguments, and return values.
- **Type Hinting:** The project uses type hinting extensively. All new code must include type hints for all function arguments and return values.
- use no emojis

### Testing
- **Unit Tests:** All new features and bug fixes must be accompanied by unit tests that cover the new code. Do not use pytest under any circumstance.
- **Integration Tests:** When making changes that affect multiple components, add integration tests to verify that the components interact correctly.
- **Test Coverage:** Strive to maintain a high level of test coverage for all new code.
- **Mock Verification:** When using `unittest.mock.patch`, ensure that the mocked objects' methods are called with the correct arguments (positional vs. keyword) by carefully inspecting `call_args` (e.g., `mock_obj.call_args.args` for positional, `mock_obj.call_args.kwargs` for keyword). This helps prevent `KeyError` or `AttributeError` when verifying mock interactions.

### Security
- **Input Validation:** All inputs from external sources, such as configuration files and user-provided prompts, must be carefully validated to prevent security vulnerabilities.
- **Secure Coding Practices:** Follow secure coding practices to prevent common security vulnerabilities, such as injection attacks and insecure deserialization.
- **Dependency Management:** Keep all project dependencies up-to-date to avoid using versions with known security vulnerabilities.

### Code Examples
- **No Example Code in Files:** Do not add example code directly into source files. If example code is requested, incorporate it into a dedicated test file, as individual modular files are not designed for direct execution.

### Communication
- **Summarize Changes:** Do not display code diffs in the command-line interface. Instead, at the end of your response, provide a list of the files that have been modified, each with a one-sentence description of the changes. You are writing on a Windows machine.

By following these guidelines, the Gemini AI assistant can effectively contribute to the development of the MAVERICK project and help us achieve our goal of building a state-of-the-art, automated red-teaming pipeline for LLMs.