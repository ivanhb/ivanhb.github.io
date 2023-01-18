from argparse import ArgumentParser
from os.path import exists
from os import makedirs, sep
from html_parser import BSParser
from report import Report

if __name__ == "__main__":
    arg_parser = ArgumentParser("push_report.py", description="Push a new report in the corresponding report repository of the given model")
    arg_parser.add_argument("-m", "--model", dest="model_path", required=True, help="The model-index file path")
    arg_parser.add_argument("-t", "--format", dest="format", required=True, help="The format of the given report file")
    arg_parser.add_argument("-in", "--input", dest="report_path", required=True, help="The report file")

    args = arg_parser.parse_args()

    report = Report(args.model_path, args.type, args.report_path)
